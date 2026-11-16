"use client";

import { MessageCircle, Sparkles } from "lucide-react";

interface FinalCtaProps {
  onOpenConcierge: () => void;
}

export function FinalCta({ onOpenConcierge }: FinalCtaProps) {
  return (
    <section className="bg-navy-900 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-5 text-center sm:px-8 md:flex-row md:text-left">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
            Pronto para visitar o seu próximo imóvel em Fortaleza?
          </h2>
          <p className="mt-1.5 text-sm text-slate-300">
            Atendimento imediato com especialistas do Meireles ao Cocó.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/5585999110001?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20com%20a%20Cear%C3%A1%20Prime."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-semibold text-white transition hover:bg-white/20"
          >
            <MessageCircle className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
            WhatsApp Direto
          </a>
          <button
            type="button"
            onClick={onOpenConcierge}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-semibold text-white transition hover:bg-emerald-600"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            Abrir Concierge IA
          </button>
        </div>
      </div>
    </section>
  );
}
