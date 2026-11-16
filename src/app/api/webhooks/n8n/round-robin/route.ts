import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { LeadStatus, MessageChannel, MessageSender } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyN8nSecret } from "@/lib/n8n-auth";

const roundRobinSchema = z.object({
  leadId: z.string(),
});

/**
 * POST /api/webhooks/n8n/round-robin
 * Distribuição justa (Round-Robin) priorizando corretores especialistas no bairro do lead.
 * Inicia o cronômetro de SLA de 2 minutos (handoffAt).
 */
export async function POST(req: NextRequest) {
  const authError = verifyN8nSecret(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const parsed = roundRobinSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "leadId obrigatório" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: parsed.data.leadId },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
    }

    // 1. Tenta corretor ativo especialista no bairro preferido com fila mais antiga
    let selectedBroker = lead.preferredNeighborhood
      ? await prisma.broker.findFirst({
          where: {
            isActive: true,
            specialties: { has: lead.preferredNeighborhood },
          },
          orderBy: { lastAssignedAt: "asc" },
        })
      : null;

    // 2. Fallback: qualquer corretor ativo com fila mais antiga
    if (!selectedBroker) {
      selectedBroker = await prisma.broker.findFirst({
        where: { isActive: true },
        orderBy: { lastAssignedAt: "asc" },
      });
    }

    if (!selectedBroker) {
      return NextResponse.json(
        { error: "Nenhum corretor ativo disponível no momento" },
        { status: 503 }
      );
    }

    const now = new Date();

    const [updatedLead, updatedBroker] = await prisma.$transaction([
      prisma.lead.update({
        where: { id: lead.id },
        data: {
          assignedBrokerId: selectedBroker.id,
          status: LeadStatus.HANDOFF_PENDING,
          handoffAt: now,
          assumedAt: null,
          slaBreached: false,
        },
        include: { assignedBroker: true },
      }),
      prisma.broker.update({
        where: { id: selectedBroker.id },
        data: { lastAssignedAt: now },
      }),
      prisma.chatMessage.create({
        data: {
          leadId: lead.id,
          sender: MessageSender.SYSTEM,
          channel: MessageChannel.WHATSAPP,
          content: `Lead encaminhado via Round-Robin para o corretor ${selectedBroker.name} (CRECI ${selectedBroker.creci}). SLA de 2 minutos iniciado.`,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      broker: updatedBroker,
      slaDeadlineAt: new Date(now.getTime() + 2 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    console.error("[n8n/round-robin] Error:", error);
    return NextResponse.json({ error: "Erro no Round-Robin" }, { status: 500 });
  }
}
