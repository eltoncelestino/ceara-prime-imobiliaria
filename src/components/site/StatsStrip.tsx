"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

// Dados fictícios de demonstração
const STATS: StatItem[] = [
  { value: 480, suffix: "+", label: "Imóveis negociados (Demo)" },
  { value: 14, suffix: " anos", label: "Atuação em Fortaleza (Demo)" },
  { value: 5, suffix: " praças", label: "Bairros nobres atendidos" },
  { value: 47, suffix: "s", label: "Tempo médio de 1ª resposta" },
];

function AnimatedCounter({ item }: { item: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });
  const shouldReduceMotion = useReducedMotion();
  const [val, setVal] = useState(shouldReduceMotion ? item.value : 0);

  useEffect(() => {
    if (!inView || shouldReduceMotion) {
      if (inView) setVal(item.value);
      return;
    }
    const ctrl = animate(0, item.value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, item.value, shouldReduceMotion]);

  return (
    <div ref={ref} className="text-center">
      <p className="tabular-nums font-serif text-3xl font-bold text-navy-900 sm:text-4xl">
        {val}
        {item.suffix}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-600">
        {item.label}
      </p>
    </div>
  );
}

export function StatsStrip() {
  return (
    <section className="border-y border-gold-400/30 bg-sand-100 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((item) => (
          <AnimatedCounter key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
}
