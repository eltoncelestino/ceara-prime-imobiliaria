"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const shouldReduceMotion = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, score));

  const tier =
    clamped >= 80
      ? {
          label: "Quente",
          barClass: "bg-emerald-500",
          pillClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        }
      : clamped >= 50
      ? {
          label: "Morno",
          barClass: "bg-amber-400",
          pillClass: "border-amber-400/30 bg-amber-400/10 text-amber-400",
        }
      : {
          label: "Frio",
          barClass: "bg-sky-400",
          pillClass: "border-sky-400/30 bg-sky-400/10 text-sky-400",
        };

  return (
    <div
      title={`Lead Score: ${clamped}/100 (${tier.label})`}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tier.pillClass}`}
    >
      <div className="h-1.5 w-8 overflow-hidden rounded-full bg-ink-950/60">
        <motion.div
          initial={
            shouldReduceMotion ? { width: `${clamped}%` } : { width: "0%" }
          }
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`h-full rounded-full ${tier.barClass}`}
        />
      </div>
      <span className="tabular-nums">{clamped}</span>
    </div>
  );
}
