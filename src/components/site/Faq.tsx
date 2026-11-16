"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/data/mockData";

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-sand-100 py-20 text-navy-900">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            Dúvidas Frequentes
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
            Perguntas sobre compra, locação e visitas
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-gold-400/25 bg-white shadow-sm"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-gold-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-600">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
