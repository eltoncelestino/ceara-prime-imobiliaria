import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { LeadObjective, LeadStatus, MessageChannel, MessageSender } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyN8nSecret } from "@/lib/n8n-auth";

const qualifySchema = z.object({
  leadId: z.string().optional(),
  phone: z.string().optional(),
  objective: z.nativeEnum(LeadObjective).optional(),
  budgetMax: z.number().int().positive().optional(),
  preferredNeighborhood: z.string().optional(),
  userMessage: z.string().optional(),
  aiReply: z.string().optional(),
});

/**
 * POST /api/webhooks/n8n/qualify
 * Atualiza os critérios de qualificação extraídos pelo nó de IA (OpenAI) no n8n,
 * calcula o score do lead e retorna os cards de imóveis compatíveis em Fortaleza.
 */
export async function POST(req: NextRequest) {
  const authError = verifyN8nSecret(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const parsed = qualifySchema.safeParse(body);

    if (!parsed.success || (!parsed.data.leadId && !parsed.data.phone)) {
      return NextResponse.json(
        { error: "Informe leadId ou phone e dados válidos" },
        { status: 400 }
      );
    }

    const { leadId, phone, objective, budgetMax, preferredNeighborhood, userMessage, aiReply } =
      parsed.data;

    const existingLead = await prisma.lead.findFirst({
      where: leadId ? { id: leadId } : { phone: phone!.replace(/\D/g, "") },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
    }

    const nextObjective = objective ?? existingLead.objective;
    const nextBudgetMax = budgetMax ?? existingLead.budgetMax;
    const nextNeighborhood = preferredNeighborhood ?? existingLead.preferredNeighborhood;

    // Cálculo simples de score de conversão (0-100)
    let score = 30;
    if (nextObjective) score += 20;
    if (nextBudgetMax) score += 25;
    if (nextNeighborhood) score += 25;

    const isFullyQualified = Boolean(nextObjective && nextBudgetMax && nextNeighborhood);

    const updatedLead = await prisma.lead.update({
      where: { id: existingLead.id },
      data: {
        objective: nextObjective,
        budgetMax: nextBudgetMax,
        preferredNeighborhood: nextNeighborhood,
        score,
        status: isFullyQualified ? LeadStatus.QUALIFIED : LeadStatus.QUALIFYING,
        lastMessageAt: new Date(),
      },
    });

    // Busca imóveis compatíveis na praça de Fortaleza
    const matchingProperties = await prisma.property.findMany({
      where: {
        isAvailable: true,
        ...(nextObjective ? { objective: nextObjective } : {}),
        ...(nextNeighborhood ? { neighborhood: { contains: nextNeighborhood, mode: "insensitive" } } : {}),
        ...(nextBudgetMax ? { price: { lte: Math.round(nextBudgetMax * 1.15) } } : {}),
      },
      orderBy: { price: "asc" },
      take: 3,
    });

    if (userMessage) {
      await prisma.chatMessage.create({
        data: {
          leadId: updatedLead.id,
          sender: MessageSender.USER,
          channel: MessageChannel.WHATSAPP,
          content: userMessage,
        },
      });
    }

    if (aiReply || matchingProperties.length > 0) {
      await prisma.chatMessage.create({
        data: {
          leadId: updatedLead.id,
          sender: MessageSender.AI,
          channel: MessageChannel.WHATSAPP,
          content:
            aiReply ??
            `Encontrei ${matchingProperties.length} opções exclusivas em ${nextNeighborhood ?? "Fortaleza"} para o seu perfil:`,
          propertyCards: matchingProperties.map((p) => ({
            id: p.id,
            code: p.code,
            title: p.title,
            price: p.price,
            neighborhood: p.neighborhood,
            bedrooms: p.bedrooms,
            suites: p.suites,
            areaSqm: p.areaSqm,
            oceanView: p.oceanView,
            imageUrl: p.imageUrl,
          })),
        },
      });
    }

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      isFullyQualified,
      matchingProperties,
    });
  } catch (error) {
    console.error("[n8n/qualify] Error:", error);
    return NextResponse.json({ error: "Erro ao qualificar lead" }, { status: 500 });
  }
}
