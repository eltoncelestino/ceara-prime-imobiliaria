"use client";

import { Star } from "lucide-react";
import { DEMO_TESTIMONIALS } from "@/data/mockData";
import { SafeImage } from "../ui/SafeImage";

export function Testimonials() {
  return (
    <section className="bg-snow-50 py-20 text-navy-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            Experiências Reais Simuladas (Demonstração)
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
            Quem já encontrou seu endereço em Fortaleza
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {DEMO_TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            >
              <div>
                <div className="mb-3 flex gap-1 text-gold-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <SafeImage
                    src={t.avatarUrl}
                    alt={t.name}
                    width={40}
                    height={40}
                    sizes="40px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">{t.name}</p>
                  <p className="text-[11px] text-slate-600">{t.neighborhood}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
