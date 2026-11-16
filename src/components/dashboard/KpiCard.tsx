"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  numericValue: number;
  suffix?: string;
  decimals?: number;
  sub: string;
  tooltip: string;
  icon: LucideIcon;
  iconColorClass: string;
  pulseIcon?: boolean;
}

export function KpiCard({
  label,
  numericValue,
  suffix = "",
  decimals = 0,
  sub,
  tooltip,
  icon: Icon,
  iconColorClass,
  pulseIcon = false,
}: KpiCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    shouldReduceMotion ? numericValue : 0
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(numericValue);
      return;
    }

    const controls = animate(0, numericValue, {
      duration: 1.0,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(latest),
    });

    return () => controls.stop();
  }, [numericValue, shouldReduceMotion]);

  const formatted = displayValue.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      title={tooltip}
      className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition-colors hover:border-gold-400/40 dark:border-white/10 dark:bg-ink-800 dark:shadow-ink-card dark:hover:border-gold-400/40"
    >
      <div
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-ink-900 ${iconColorClass}`}
      >
        {pulseIcon && !shouldReduceMotion && (
          <span className="animate-pulse-ring absolute inset-0 rounded-xl bg-emerald-500/35" />
        )}
        <Icon className="relative z-10 h-5 w-5" strokeWidth={1.5} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-gold-400">
          {label}
        </p>
        <p className="tabular-nums font-serif text-xl font-bold leading-tight text-ink-900 dark:text-gold-200">
          {formatted}
          {suffix}
        </p>
        <p className="truncate text-[11px] text-slate-500 dark:text-text-muted">
          {sub}
        </p>
      </div>
    </motion.div>
  );
}
