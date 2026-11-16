"use client";

import { MessageCircle } from "lucide-react";
import { MOCK_BROKERS } from "@/data/mockData";
import { SafeImage } from "../ui/SafeImage";

export function BrokerTeam() {
  return (
    <section id="equipe" className="bg-sand-100 py-20 text-navy-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            Corretores Especialistas (Demonstração)
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
            Nossa equipe de Private Brokers
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_BROKERS.map((broker) => (
            <div
              key={broker.id}
              className="flex flex-col rounded-2xl border border-gold-400/25 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-400/50">
                  <SafeImage
                    src={broker.avatarUrl ?? ""}
                    alt={broker.name}
                    width={56}
                    height={56}
                    sizes="56px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-slate-900">
                    {broker.name}
                  </h3>
                  <p className="tabular-nums text-xs font-medium text-slate-600">
                    CRECI {broker.creci}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {(broker.specialties ?? ["Fortaleza"]).map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-800"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <a
                href={`https://wa.me/5585999110001?text=${encodeURIComponent(
                  `Olá! Gostaria de falar com o corretor ${broker.name} (CRECI ${broker.creci}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600"
              >
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
                Falar no WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
