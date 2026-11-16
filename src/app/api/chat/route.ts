import { NextRequest, NextResponse } from "next/server";
import { LeadObjective } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface ChatRequestBody {
  objective?: LeadObjective;
  budgetMax?: number;
  neighborhood?: string;
}

/**
 * POST /api/chat
 * Endpoint usado pelo Chat Interativo Web para buscar imóveis reais do PostgreSQL
 * conforme a triagem (Objetivo -> Orçamento -> Bairro em Fortaleza).
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatRequestBody;
    const { objective, budgetMax, neighborhood } = body;

    const properties = await prisma.property.findMany({
      where: {
        isAvailable: true,
        ...(objective ? { objective } : {}),
        ...(neighborhood ? { neighborhood: { contains: neighborhood, mode: "insensitive" } } : {}),
        ...(budgetMax ? { price: { lte: Math.round(budgetMax * 1.15) } } : {}),
      },
      orderBy: { price: "asc" },
      take: 3,
    });

    return NextResponse.json({ properties });
  } catch (error) {
    console.error("[POST /api/chat] Error:", error);
    return NextResponse.json({ properties: [] }, { status: 200 });
  }
}
