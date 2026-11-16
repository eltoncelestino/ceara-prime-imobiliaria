import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { LeadObjective, LeadSource, LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const leadIntakeSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  phone: z.string().min(10, "Informe um WhatsApp válido"),
  goal: z.enum(["COMPRAR", "ALUGAR", "INVESTIR"]),
  budgetRange: z.string().min(1),
  neighborhood: z.string().min(1),
  propertyId: z.string().optional(),
  source: z.enum(["site", "site_chat"]).default("site"),
  honeypot: z.string().optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
  consent: z.object({
    whatsapp: z.literal(true, {
      errorMap: () => ({ message: "Consentimento LGPD obrigatório" }),
    }),
    timestamp: z.string(),
    ip: z.string().optional(),
  }),
});

// Rate limiting simples em memória (10 requisições/minuto por IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count += 1;
  return true;
}

function parseBudgetMax(range: string): number {
  const digits = range.replace(/\D/g, "");
  if (range.includes("800")) return 800000;
  if (range.includes("1,5") || range.includes("1.5")) return 1500000;
  if (range.includes("3") || range.includes("Acima")) return 3500000;
  return digits ? Number(digits) : 1200000;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde um minuto." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = leadIntakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Honeypot anti-bot silencioso
    if (parsed.data.honeypot && parsed.data.honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, leadId: "filtered" });
    }

    const {
      name,
      phone,
      goal,
      budgetRange,
      neighborhood,
      propertyId,
      source,
      utm,
      consent,
    } = parsed.data;

    const normalizedPhone = phone.replace(/\D/g, "");
    const e164Phone = normalizedPhone.startsWith("55")
      ? normalizedPhone
      : `55${normalizedPhone}`;

    let leadId = `site-${Date.now()}`;
    try {
      const lead = await prisma.lead.upsert({
        where: { phone: e164Phone },
        update: {
          name,
          objective: goal as LeadObjective,
          budgetMax: parseBudgetMax(budgetRange),
          preferredNeighborhood: neighborhood,
          propertyId: propertyId ?? undefined,
          utm: utm ?? undefined,
          consentAt: new Date(consent.timestamp),
          lastMessageAt: new Date(),
        },
        create: {
          name,
          phone: e164Phone,
          source:
            source === "site_chat"
              ? LeadSource.SITE_CHAT
              : LeadSource.SITE_CHAT,
          status: LeadStatus.NEW,
          objective: goal as LeadObjective,
          budgetMax: parseBudgetMax(budgetRange),
          preferredNeighborhood: neighborhood,
          propertyId: propertyId ?? undefined,
          utm: utm ?? undefined,
          optInLgpd: true,
          consentAt: new Date(consent.timestamp),
          score: 75,
        },
      });
      leadId = lead.id;
    } catch {
      // Fallback silencioso caso o PostgreSQL local não esteja ativo
    }

    // Dispara webhook do n8n em background (sem travar a resposta < 1s)
    const n8nUrl = process.env.N8N_BASE_URL;
    if (n8nUrl) {
      fetch(`${n8nUrl}/webhook/ceara-prime/lead-intake`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-n8n-secret": process.env.N8N_WEBHOOK_SECRET ?? "",
        },
        body: JSON.stringify({
          leadId,
          name,
          phone: e164Phone,
          goal,
          budgetRange,
          neighborhood,
          propertyId,
          source,
          utm,
        }),
      }).catch(() => {});
    }

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: "Recebemos seu contato! Um especialista entrará em contato em segundos.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[POST /api/webhooks/leads] Error:", error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 }
    );
  }
}
