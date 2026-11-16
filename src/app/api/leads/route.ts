import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/leads
 * Lista todos os leads para o painel Kanban da Ceará Prime Imóveis.
 */
export async function GET(req: NextRequest) {
  try {
    const neighborhood = req.nextUrl.searchParams.get("neighborhood");

    const leads = await prisma.lead.findMany({
      where: neighborhood && neighborhood !== "TODOS"
        ? { preferredNeighborhood: neighborhood }
        : undefined,
      include: {
        assignedBroker: {
          select: {
            id: true,
            name: true,
            creci: true,
            avatarUrl: true,
          },
        },
        visits: {
          orderBy: { scheduledAt: "desc" },
          take: 1,
          include: {
            property: {
              select: { title: true, neighborhood: true },
            },
          },
        },
      },
      orderBy: [{ slaBreached: "desc" }, { updatedAt: "desc" }],
    });

    return NextResponse.json({ leads });
  } catch {
    // Em ambiente sem PostgreSQL ativo, o frontend utiliza os dados de demonstração
    return NextResponse.json({ leads: [], demoMode: true });
  }
}
