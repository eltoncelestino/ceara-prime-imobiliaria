import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { LeadSource, LeadStatus, MessageChannel, MessageSender } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyN8nSecret } from "@/lib/n8n-auth";

const intakeSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(8),
  email: z.string().email().optional().nullable(),
  source: z.nativeEnum(LeadSource).default(LeadSource.META_ADS),
  preferredNeighborhood: z.string().optional().nullable(),
  adCampaign: z.string().optional().nullable(),
});

/**
 * POST /api/webhooks/n8n/lead-intake
 * Gatilho de velocidade (< 1s): Recebe o payload do n8n (Meta Ads / ZapImóveis),
 * persiste o lead no PostgreSQL e retorna a saudação personalizada para disparo via WhatsApp.
 */
export async function POST(req: NextRequest) {
  const authError = verifyN8nSecret(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const parsed = intakeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Payload inválido", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, phone, email, source, preferredNeighborhood } = parsed.data;
    const normalizedPhone = phone.replace(/\D/g, "");
    const firstName = name.trim().split(" ")[0];

    const lead = await prisma.lead.upsert({
      where: { phone: normalizedPhone },
      update: {
        name,
        lastMessageAt: new Date(),
        ...(preferredNeighborhood ? { preferredNeighborhood } : {}),
      },
      create: {
        name,
        phone: normalizedPhone,
        email: email ?? undefined,
        source,
        status: LeadStatus.QUALIFYING,
        preferredNeighborhood: preferredNeighborhood ?? undefined,
        score: 25,
      },
    });

    const greetingMessage =
      `Olá, ${firstName}! Sou a assistente virtual da Ceará Prime Imóveis. ` +
      `Vi seu interesse em imóveis em Fortaleza. Qual o seu principal objetivo hoje? ` +
      `(Comprar, Alugar ou Investir)`;

    await prisma.chatMessage.create({
      data: {
        leadId: lead.id,
        sender: MessageSender.AI,
        channel: MessageChannel.WHATSAPP,
        content: greetingMessage,
      },
    });

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        phone: lead.phone,
        greetingMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[n8n/lead-intake] Error:", error);
    return NextResponse.json({ error: "Erro interno ao processar lead" }, { status: 500 });
  }
}
