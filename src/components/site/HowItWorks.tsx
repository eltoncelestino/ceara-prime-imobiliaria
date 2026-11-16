"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, MessageSquareText, Sparkles } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Conte o que procura",
    description:
      "Informe seu objetivo (comprar, alugar ou investir), faixa de valor e bairro preferido em Fortaleza.",
    icon: MessageSquareText,
  },
  {
    num: "02",
    title: "Receba curadoria em segundos",
    description:
      "Nossa IA consulta o portfólio em tempo real e envia até 3 opções compatíveis direto no seu WhatsApp.",
    icon: Sparkles,
  },
  {
    num: "03",
    title: "Visite com especialista",
    description:
      "Escolha um horário na agenda do corretor do bairro, com confirmação em 1 clique e rota no Google Maps.",
    icon: CalendarCheck,
  },
];

export function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="como-funciona" className="bg-sand-100 py-20 text-navy-900">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-14 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            Jornada Sem Atrito
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
            Do primeiro clique à visita em 3 passos
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Linha de progresso SVG animada no desktop */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-10 hidden h-2 w-full md:block"
            viewBox="0 0 900 10"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="150"
              y1="5"
              x2="750"
              y2="5"
              stroke="#D4AF6A"
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ delay: i * 0.12 }}
                className="relative z-10 flex flex-col items-center rounded-2xl border border-gold-400/25 bg-white p-7 text-center shadow-sm"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 shadow-md">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">
                  Passo {step.num}
                </span>
                <h3 className="mt-1 font-serif text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
