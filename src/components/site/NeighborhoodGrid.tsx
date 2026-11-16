"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NEIGHBORHOOD_GUIDES } from "@/data/mockData";
import { SafeImage } from "../ui/SafeImage";

export function NeighborhoodGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="bairros" className="bg-navy-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            Explore por Bairro
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
            As praças mais cobiçadas de Fortaleza
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Atuação especializada com corretores plantonistas em cada região.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
          {NEIGHBORHOOD_GUIDES.map((item, idx) => {
            const spanClass =
              idx < 2 ? "md:col-span-3 h-80" : "md:col-span-2 h-72";

            return (
              <motion.div
                key={item.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ delay: idx * 0.08 }}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 ${spanClass}`}
              >
                <Link
                  href={`/imoveis?neighborhood=${encodeURIComponent(item.name)}`}
                  className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <SafeImage
                    src={item.imageUrl}
                    alt={`Imóveis no bairro ${item.name} em Fortaleza`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/60 to-navy-950/10" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl font-semibold text-white drop-shadow-md">
                        {item.name}
                      </h3>
                      <ArrowUpRight
                        className="h-5 w-5 text-gold-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="mt-1 text-xs font-semibold text-gold-200 drop-shadow">
                      {item.avgPrice}
                    </p>
                    <p className="mt-2 max-h-0 overflow-hidden text-xs text-slate-200 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
