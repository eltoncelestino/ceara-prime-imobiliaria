import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { LeadStatus, MessageChannel, MessageSender, VisitStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyN8nSecret } from "@/lib/n8n-auth";

const scheduleVisitSchema = z.object({
  leadId: z.string(),
  propertyId: z.string(),
  brokerId: z.string().optional(),
  scheduledAt: z.string().datetime(),
});

/**
 * POST /api/webhooks/n8n/schedule-visit
 * Sincroniza disponibilidade do corretor plantonista, cria a visita com token de
 * confirmação em 1 clique e gera a rota integrada no Google Maps.
 */
export async function POST(req: NextRequest) {
  const authError = verifyN8nSecret(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const parsed = scheduleVisitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados de agendamento inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { leadId, propertyId, scheduledAt } = parsed.data;
    const visitDate = new Date(scheduledAt);

    const [lead, property] = await Promise.all([
      prisma.lead.findUnique({ where: { id: leadId } }),
      prisma.property.findUnique({ where: { id: propertyId } }),
    ]);

    if (!lead || !property) {
      return NextResponse.json({ error: "Lead ou imóvel não encontrado" }, { status: 404 });
    }

    // Seleciona corretor informado, atribuído ao lead ou plantonista do bairro
    let brokerId: string | null | undefined =
      parsed.data.brokerId ?? lead.assignedBrokerId;
    if (!brokerId) {
      const specialist = await prisma.broker.findFirst({
        where: { isActive: true, specialties: { has: property.neighborhood } },
        orderBy: { lastAssignedAt: "asc" },
      });
      brokerId = specialist?.id;
    }

    if (!brokerId) {
      const fallback = await prisma.broker.findFirst({ where: { isActive: true } });
      brokerId = fallback?.id;
    }

    if (!brokerId) {
      return NextResponse.json({ error: "Nenhum corretor disponível" }, { status: 503 });
    }

    // Verifica conflito de agenda (+/- 45 min)
    const windowStart = new Date(visitDate.getTime() - 45 * 60 * 1000);
    const windowEnd = new Date(visitDate.getTime() + 45 * 60 * 1000);
    const conflict = await prisma.visit.findFirst({
      where: {
        brokerId,
        status: { in: [VisitStatus.SCHEDULED, VisitStatus.CONFIRMED] },
        scheduledAt: { gte: windowStart, lte: windowEnd },
      },
    });

    if (conflict) {
      return NextResponse.json(
        {
          error: "Horário indisponível para o corretor selecionado",
          conflictAt: conflict.scheduledAt,
        },
        { status: 409 }
      );
    }

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`;

    const visit = await prisma.visit.create({
      data: {
        leadId: lead.id,
        propertyId: property.id,
        brokerId,
        scheduledAt: visitDate,
        googleMapsUrl,
      },
      include: {
        broker: true,
        property: true,
      },
    });

    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        status: LeadStatus.VISIT_SCHEDULED,
        assignedBrokerId: brokerId,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const confirmUrl = `${appUrl}/api/visits/${visit.confirmationToken}/confirm`;

    const whatsappReminderText =
      `✅ *Visita Agendada - Ceará Prime Imóveis*\n\n` +
      `🏠 *Imóvel:* ${property.title}\n` +
      `📍 *Endereço:* ${property.address}\n` +
      `🗓️ *Data/Hora:* ${visitDate.toLocaleString("pt-BR", { timeZone: "America/Fortaleza" })}\n` +
      `👔 *Corretor:* ${visit.broker.name} (CRECI ${visit.broker.creci})\n\n` +
      `🗺️ *Abrir Rota no Google Maps:* ${googleMapsUrl}\n` +
      `👉 *Confirmar Presença (1 clique):* ${confirmUrl}`;

    await prisma.chatMessage.create({
      data: {
        leadId: lead.id,
        sender: MessageSender.AI,
        channel: MessageChannel.WHATSAPP,
        content: whatsappReminderText,
      },
    });

    return NextResponse.json(
      {
        success: true,
        visit,
        confirmUrl,
        whatsappReminderText,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[n8n/schedule-visit] Error:", error);
    return NextResponse.json({ error: "Erro ao agendar visita" }, { status: 500 });
  }
}
