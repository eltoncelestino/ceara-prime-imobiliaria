import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * Valida o segredo compartilhado (x-n8n-secret) ou assinatura HMAC-SHA256
 * no header x-webhook-signature para garantir autenticidade dos webhooks.
 */
export function verifyN8nSecret(req: NextRequest, rawBody?: string): NextResponse | null {
  const expectedSecret = process.env.N8N_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return null;
  }

  const providedSecret = req.headers.get("x-n8n-secret");
  if (providedSecret && providedSecret === expectedSecret) {
    return null;
  }

  const signature = req.headers.get("x-webhook-signature");
  if (signature && rawBody) {
    const expectedSig = crypto
      .createHmac("sha256", expectedSecret)
      .update(rawBody)
      .digest("hex");
    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }
  }

  return NextResponse.json(
    { error: "Unauthorized: Invalid webhook secret or HMAC signature" },
    { status: 401 }
  );
}
