"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { HERO_BEIRA_MAR_IMAGE } from "@/data/mockData";
import { SafeImage } from "../ui/SafeImage";
import { SearchBar } from "./SearchBar";

interface HeroProps {
  onOpenConcierge: () => void;
}

export function Hero({ onOpenConcierge }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 90]);

  return (
    <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-navy-950 pt-24 pb-16 text-white">
      <motion.div
        style={shouldReduceMotion ? undefined : { y: bgY }}
        className="absolute inset-0"
      >
        <SafeImage
          src={HERO_BEIRA_MAR_IMAGE}
          alt="Orla da Avenida Beira-Mar em Fortaleza ao entardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-navy-950/70" />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 text-center sm:px-8">
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-navy-900/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-200 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
          Meireles · Beira-Mar · Aldeota · Cocó · Dionísio Torres
        </motion.span>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="max-w-4xl font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          O endereço dos seus sonhos em Fortaleza começa aqui.
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-5 max-w-2xl text-base text-slate-200 sm:text-lg"
        >
          Curadoria exclusiva de apartamentos vista mar, coberturas e investimentos
          nos bairros mais valorizados do Ceará — com atendimento instantâneo em menos de 1 minuto.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Link
            href="/imoveis"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Buscar imóveis
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>

          <button
            type="button"
            onClick={onOpenConcierge}
            className="inline-flex items-center gap-2 rounded-xl border border-gold-400/50 bg-navy-900/70 px-6 py-3.5 text-sm font-semibold text-gold-200 backdrop-blur-md transition hover:bg-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Conversar agora
          </button>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 w-full flex justify-center"
        >
          <SearchBar />
        </motion.div>

        {/* Indicadores de confiança */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
            Resposta em menos de 1 minuto
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-gold-400" strokeWidth={1.5} />
            CRECI Jurídico Ativo (Demonstração)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
            +120 imóveis exclusivos
          </span>
        </div>
      </div>
    </section>
  );
}
