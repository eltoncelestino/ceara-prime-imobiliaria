"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, CheckCircle2, Sparkles, Zap } from "lucide-react";

interface ConciergeShowcaseProps {
  onOpenConcierge: () => void;
}

const LOOP_STEPS = [
  {
    sender: "AI",
    text: "Olá! Sou a assistente virtual da Ceará Prime Imóveis. Qual seu principal objetivo em Fortaleza?",
  },
  {
    sender: "USER",
    text: "Comprar apartamento 3 quartos no Meireles, até R$ 1,2 milhão.",
  },
  {
    sender: "AI",
    text: "Encontrei 3 opções exclusivas com vista mar! Pré-reserva disponível amanhã às 10h30 com o corretor Carlos Eduardo.",
  },
];

export function ConciergeShowcase({ onOpenConcierge }: ConciergeShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleCount(3);
      return;
    }
    const timer = setInterval(() => {
      setVisibleCount((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 2400);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section className="bg-navy-950 py-20 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            <Zap className="h-3.5 w-3.5" strokeWidth={1.5} />
            Concierge IA 24/7
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Atendimento instantâneo que entende o mercado de Fortaleza.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            Nada de formulários frios ou espera de horas. Nosso Concierge IA qualifica seu perfil em segundos, envia plantas reais com fotos e conecta você ao corretor especialista no bairro.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-slate-200">
            {[
              "Primeira resposta em menos de 1 segundo no WhatsApp e Web",
              "Seleção inteligente por bairro, metragem e faixa de valor",
              "Agendamento de visita com rota integrada no Google Maps",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-emerald-500"
                  strokeWidth={1.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onOpenConcierge}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            Experimente agora
          </button>
        </div>

        {/* Mockup animado em loop */}
        <div className="rounded-3xl border border-gold-400/25 bg-ink-900 p-5 shadow-2xl">
          <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-800 text-emerald-500">
              <Bot className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Concierge Ceará Prime
              </p>
              <p className="text-[11px] text-emerald-400">Online agora</p>
            </div>
          </div>

          <div className="min-h-[240px] space-y-3">
            <AnimatePresence>
              {LOOP_STEPS.slice(0, visibleCount).map((step, i) => (
                <motion.div
                  key={i}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${
                    step.sender === "USER" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      step.sender === "USER"
                        ? "bg-ink-700 text-white"
                        : "border border-white/10 bg-ink-800 text-slate-100"
                    }`}
                  >
                    {step.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
