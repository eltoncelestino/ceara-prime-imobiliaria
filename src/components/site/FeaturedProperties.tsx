"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PropertyCardData } from "@/types/realestate";
import { PropertyCard } from "../chat/PropertyCard";

interface FeaturedPropertiesProps {
  properties: PropertyCardData[];
  onScheduleProperty: (property: PropertyCardData) => void;
}

export function FeaturedProperties({
  properties,
  onScheduleProperty,
}: FeaturedPropertiesProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-snow-50 py-20 text-navy-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
              Portfólio Selecionado
            </span>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">
              Imóveis em destaque em Fortaleza
            </h2>
          </div>

          <Link
            href="/imoveis"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition hover:text-emerald-600"
          >
            Ver portfólio completo
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {properties.slice(0, 6).map((prop, idx) => (
            <div key={prop.id} className="flex justify-center">
              <div className="w-full max-w-sm [&>article]:w-full">
                <PropertyCard
                  property={prop}
                  index={idx}
                  onScheduleClick={onScheduleProperty}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
