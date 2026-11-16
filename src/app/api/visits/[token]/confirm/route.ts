import { NextRequest, NextResponse } from "next/server";
import { VisitStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/visits/[token]/confirm
 * Confirmação em 1 clique enviada no lembrete de WhatsApp (Anti-No-Show).
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await context.params;

    const visit = await prisma.visit.findUnique({
      where: { confirmationToken: token },
      include: { property: true, broker: true },
    });

    if (!visit) {
      return NextResponse.json({ error: "Token de confirmação inválido" }, { status: 404 });
    }

    const updated = await prisma.visit.update({
      where: { id: visit.id },
      data: {
        status: VisitStatus.CONFIRMED,
        confirmedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Visita confirmada para ${visit.property.title} com o corretor ${visit.broker.name}.`,
      visit: updated,
      googleMapsUrl: visit.googleMapsUrl,
    });
  } catch (error) {
    console.error("[visits/confirm] Error:", error);
    return NextResponse.json({ error: "Erro ao confirmar visita" }, { status: 500 });
  }
}
