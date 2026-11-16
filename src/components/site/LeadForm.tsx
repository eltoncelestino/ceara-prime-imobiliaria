"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { HERO_BEIRA_MAR_IMAGE } from "@/data/mockData";
import { SafeImage } from "../ui/SafeImage";

const formSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  phone: z.string().min(14, "Informe um WhatsApp válido com DDD"),
  goal: z.enum(["COMPRAR", "ALUGAR", "INVESTIR"]),
  budgetRange: z.string().min(1),
  neighborhood: z.string().min(1),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "É necessário concordar com o contato via WhatsApp (LGPD).",
    }),
  }),
});

function maskBrPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

interface LeadFormProps {
  propertyId?: string;
}

export function LeadForm({ propertyId }: LeadFormProps) {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState<"COMPRAR" | "ALUGAR" | "INVESTIR">("COMPRAR");
  const [budgetRange, setBudgetRange] = useState("R$ 800 mil a R$ 1,5 mi");
  const [neighborhood, setNeighborhood] = useState("Meireles");
  const [consent, setConsent] = useState(false); // Não pré-marcado (LGPD)
  const [honeypot, setHoneypot] = useState("");
  const [utm, setUtm] = useState<Record<string, string>>({});

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const captured: Record<string, string> = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(
        (k) => {
          const val = params.get(k);
          if (val) captured[k.replace("utm_", "")] = val;
        }
      );
      if (Object.keys(captured).length > 0) {
        window.sessionStorage.setItem("cp_utm", JSON.stringify(captured));
        setUtm(captured);
      } else {
        const saved = window.sessionStorage.getItem("cp_utm");
        if (saved) setUtm(JSON.parse(saved));
      }
    } catch {
      // Ignora
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsed = formSchema.safeParse({
      name,
      phone,
      goal,
      budgetRange,
      neighborhood,
      consent,
    });

    if (!parsed.success) {
      const firstErr = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      setErrorMsg(firstErr ?? "Verifique os campos obrigatórios.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/webhooks/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          goal,
          budgetRange,
          neighborhood,
          propertyId,
          source: "site",
          honeypot,
          utm,
          consent: {
            whatsapp: true,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erro ao enviar contato.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar.");
    }
  };

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-navy-950 py-24 text-white"
    >
      <SafeImage
        src={HERO_BEIRA_MAR_IMAGE}
        alt="Orla de Fortaleza"
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-navy-950/85" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-10 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            Atendimento Personalizado
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Receba opções exclusivas no seu WhatsApp
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Resposta em menos de 1 minuto pela nossa equipe em Fortaleza.
          </p>
        </div>

        {status === "success" ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-emerald-500/40 bg-ink-900/90 p-10 text-center backdrop-blur-xl"
          >
            <CheckCircle2
              className="mx-auto h-12 w-12 text-emerald-500"
              strokeWidth={1.5}
            />
            <h3 className="mt-4 font-serif text-2xl font-semibold text-white">
              Solicitação recebida com sucesso!
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Nossa assistente virtual já está enviando os imóveis compatíveis para o seu WhatsApp.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-gold-400/25 bg-ink-900/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            {/* Honeypot anti-bot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="lead-name"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-400"
                >
                  Nome completo
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex.: Maria Clara Rocha"
                  className="w-full rounded-xl border border-white/10 bg-ink-800 px-3.5 py-2.5 text-sm text-white placeholder-text-muted focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="lead-phone"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-400"
                >
                  WhatsApp
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(maskBrPhone(e.target.value))}
                  placeholder="(85) 99999-9999"
                  className="tabular-nums w-full rounded-xl border border-white/10 bg-ink-800 px-3.5 py-2.5 text-sm text-white placeholder-text-muted focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="lead-goal"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-400"
                >
                  Objetivo
                </label>
                <select
                  id="lead-goal"
                  value={goal}
                  onChange={(e) =>
                    setGoal(e.target.value as "COMPRAR" | "ALUGAR" | "INVESTIR")
                  }
                  className="w-full rounded-xl border border-white/10 bg-ink-800 px-3.5 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                >
                  <option value="COMPRAR">Comprar</option>
                  <option value="ALUGAR">Alugar</option>
                  <option value="INVESTIR">Investir</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="lead-budget"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-400"
                >
                  Faixa de Valor
                </label>
                <select
                  id="lead-budget"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-ink-800 px-3.5 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                >
                  <option>Até R$ 800 mil</option>
                  <option>R$ 800 mil a R$ 1,5 mi</option>
                  <option>Acima de R$ 1,5 mi</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="lead-neighborhood"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-400"
                >
                  Bairro
                </label>
                <select
                  id="lead-neighborhood"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-ink-800 px-3.5 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                >
                  <option>Meireles</option>
                  <option>Beira-Mar</option>
                  <option>Aldeota</option>
                  <option>Cocó</option>
                  <option>Dionísio Torres</option>
                </select>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2">
              <input
                id="lead-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                aria-describedby="lgpd-desc"
                className="mt-1 h-4 w-4 rounded border-white/20 bg-ink-800 text-emerald-500 focus:ring-gold-400"
              />
              <label
                id="lgpd-desc"
                htmlFor="lead-consent"
                className="text-xs leading-relaxed text-slate-300"
              >
                Concordo em receber contato e opções de imóveis da Ceará Prime
                Imóveis via WhatsApp, conforme a LGPD. Posso cancelar a qualquer
                momento respondendo &ldquo;SAIR&rdquo;.
              </label>
            </div>

            {errorMsg && (
              <p
                role="alert"
                className="rounded-xl bg-rose-500/15 px-3.5 py-2 text-xs font-medium text-rose-300"
              >
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600 disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
              ) : (
                <Send className="h-4 w-4" strokeWidth={1.5} />
              )}
              {status === "loading"
                ? "Enviando..."
                : "Receber opções no WhatsApp"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
