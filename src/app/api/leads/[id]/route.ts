import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const patchLeadSchema = z.object({
  status: z.nativeEnum(LeadStatus).optional(),
  assumeLead: z.boolean().optional(),
});

/**
 * PATCH /api/leads/[id]
 * Atualiza o estágio do lead no Kanban ou registra que o corretor assumiu o atendimento
 * (interrompendo o cronômetro de SLA de 2 minutos).
 */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = patchLeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
    }

    const { status, assumeLead } = parsed.data;

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(assumeLead
          ? {
              status: LeadStatus.IN_ATTENDANCE,
              assumedAt: new Date(),
              slaBreached: false,
            }
          : {}),
      },
      include: {
        assignedBroker: {
          select: { id: true, name: true, creci: true, avatarUrl: true },
        },
      },
    });

    return NextResponse.json({ lead: updatedLead });
  } catch (error) {
    console.error("[PATCH /api/leads/[id]] Error:", error);
    return NextResponse.json({ error: "Erro ao atualizar lead" }, { status: 500 });
  }
}
