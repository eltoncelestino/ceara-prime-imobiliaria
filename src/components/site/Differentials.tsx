"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  CalendarCheck,
  MapPin,
  Scale,
  ShieldCheck,
  Zap,
} from "lucide-react";

const ITEMS = [
  {
    title: "Resposta em < 1 minuto",
    desc: "Automação de ponta para atendimento imediato via WhatsApp.",
    icon: Zap,
  },
  {
    title: "Curadoria de Alto Padrão",
    desc: "Apenas imóveis verificados nos melhores metros quadrados de Fortaleza.",
    icon: Award,
  },
  {
    title: "Especialistas por Bairro",
    desc: "Corretores dedicados ao Meireles, Beira-Mar, Aldeota, Cocó e Dionísio.",
    icon: ShieldCheck,
  },
  {
    title: "Agendamento em 1 Clique",
    desc: "Sincronização direta com a agenda do corretor plantonista.",
    icon: CalendarCheck,
  },
  {
    title: "Lembretes e Rota Maps",
    desc: "Confirmação D-1 e 2h antes com localização exata do empreendimento.",
    icon: MapPin,
  },
  {
    title: "Transparência Jurídica",
    desc: "Due diligence completa de certidões, matrícula e financiamento.",
    icon: Scale,
  },
];

export function Differentials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-snow-50 py-20 text-navy-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            Padrão Ceará Prime
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
            Por que comprar ou investir conosco
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-gold-400/40"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
