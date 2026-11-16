import { NextRequest, NextResponse } from "next/server";
import { LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyN8nSecret } from "@/lib/n8n-auth";

/**
 * GET /api/webhooks/n8n/sla-check
 * Executado a cada 30s pelo nó Cron/Schedule do n8n.
 * Identifica leads em HANDOFF_PENDING há mais de 2 minutos sem que o corretor tenha assumido
 * e retorna o payload formatado para disparo de alerta no Telegram do gerente Roberto Viana.
 */
export async function GET(req: NextRequest) {
  const authError = verifyN8nSecret(req);
  if (authError) return authError;

  try {
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);

    const overdueLeads = await prisma.lead.findMany({
      where: {
        status: LeadStatus.HANDOFF_PENDING,
        assumedAt: null,
        slaBreached: false,
        handoffAt: {
          lte: twoMinutesAgo,
        },
      },
      include: {
        assignedBroker: true,
      },
    });

    if (overdueLeads.length === 0) {
      return NextResponse.json({ breachedCount: 0, alerts: [] });
    }

    // Marca como slaBreached = true para não duplicar alertas no Telegram
    await prisma.lead.updateMany({
      where: {
        id: { in: overdueLeads.map((l) => l.id) },
      },
      data: {
        slaBreached: true,
      },
    });

    const alerts = overdueLeads.map((lead) => ({
      leadId: lead.id,
      leadName: lead.name,
      leadPhone: lead.phone,
      neighborhood: lead.preferredNeighborhood ?? "Não informado",
      brokerName: lead.assignedBroker?.name ?? "Não atribuído",
      brokerCreci: lead.assignedBroker?.creci ?? "-",
      handoffAt: lead.handoffAt,
      telegramMessage:
        `🚨 *ALERTA DE SLA (> 2 min) - Ceará Prime Imóveis*\n\n` +
        `Gerente *Roberto Viana*, o lead *${lead.name}* (${lead.preferredNeighborhood ?? "Fortaleza"}) ` +
        `aguarda atendimento há mais de 2 minutos.\n` +
        `👤 Corretor designado: *${lead.assignedBroker?.name ?? "N/A"}* (CRECI ${lead.assignedBroker?.creci ?? "-"})\n` +
        `📱 Telefone do Lead: \`${lead.phone}\``,
    }));

    return NextResponse.json({
      breachedCount: alerts.length,
      alerts,
    });
  } catch (error) {
    console.error("[n8n/sla-check] Error:", error);
    return NextResponse.json({ error: "Erro ao verificar SLA" }, { status: 500 });
  }
}
