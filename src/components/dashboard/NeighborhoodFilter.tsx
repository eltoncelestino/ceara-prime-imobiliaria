"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Filter } from "lucide-react";
import { NEIGHBORHOOD_ITEMS } from "@/data/mockData";
import { SafeImage } from "../ui/SafeImage";

interface NeighborhoodFilterProps {
  selected: string;
  onSelect: (neighborhood: string) => void;
}

export function NeighborhoodFilter({
  selected,
  onSelect,
}: NeighborhoodFilterProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-gold-400">
        <Filter className="h-3.5 w-3.5" strokeWidth={1.5} />
        Praça
      </span>

      <div className="flex flex-wrap items-center gap-1.5">
        {NEIGHBORHOOD_ITEMS.map((item) => {
          const isActive = selected === item.name;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelect(item.name)}
              className={`relative inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                isActive
                  ? "text-white dark:text-gold-200"
                  : "border border-slate-200 bg-white text-ink-900 hover:border-gold-400/40 dark:border-white/10 dark:bg-ink-800 dark:text-text-muted dark:hover:text-text-primary"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="neighborhoodActivePill"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 360, damping: 28 }
                  }
                  className="absolute inset-0 rounded-full border border-gold-400/50 bg-ink-900 shadow-gold-glow dark:bg-ink-700"
                />
              )}

              <span
                className={`relative z-10 h-6 w-6 shrink-0 overflow-hidden rounded-full ${
                  isActive ? "ring-2 ring-gold-400" : "ring-1 ring-white/20"
                }`}
              >
                <SafeImage
                  src={item.imageUrl}
                  alt={item.name}
                  width={24}
                  height={24}
                  sizes="24px"
                  className="h-full w-full object-cover"
                />
              </span>

              <span className="relative z-10 pr-1">
                {item.name === "TODOS" ? "Todos" : item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
