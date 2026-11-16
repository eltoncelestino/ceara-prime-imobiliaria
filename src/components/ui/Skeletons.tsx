"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ShimmerBlock({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative overflow-hidden bg-slate-200 dark:bg-ink-800 ${className}`}
    >
      {!shouldReduceMotion && (
        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-gold-400/10" />
      )}
    </div>
  );
}

export function KanbanSkeleton() {
  return (
    <div className="flex h-full gap-5 overflow-x-auto px-1 pb-3 scrollbar-luxury">
      {Array.from({ length: 5 }).map((_, colIdx) => (
        <div
          key={colIdx}
          className="flex h-full w-[320px] shrink-0 flex-col rounded-3xl border border-slate-200/80 bg-white/80 p-4 dark:border-white/5 dark:bg-ink-900"
        >
          <div className="mb-4 flex items-center justify-between">
            <ShimmerBlock className="h-3.5 w-28 rounded-md" />
            <ShimmerBlock className="h-5 w-7 rounded-full" />
          </div>
          <div className="space-y-3.5">
            {Array.from({ length: colIdx % 2 === 0 ? 2 : 3 }).map((_, cardIdx) => (
              <div
                key={cardIdx}
                className="space-y-3 rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-white/10 dark:bg-ink-800"
              >
                <ShimmerBlock className="aspect-video w-full rounded-xl" />
                <ShimmerBlock className="h-5 w-2/3 rounded" />
                <ShimmerBlock className="h-3.5 w-4/5 rounded" />
                <div className="flex items-center justify-between pt-2">
                  <ShimmerBlock className="h-9 w-9 rounded-full" />
                  <ShimmerBlock className="h-7 w-24 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="w-72 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-ink-800">
      <ShimmerBlock className="h-40 w-full" />
      <div className="space-y-2.5 p-4">
        <ShimmerBlock className="h-4 w-4/5 rounded" />
        <ShimmerBlock className="h-3 w-1/2 rounded" />
        <ShimmerBlock className="h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function EmptyColumnIllustration() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300/70 bg-slate-50/50 px-4 py-10 text-center dark:border-ink-700 dark:bg-ink-950/40"
    >
      <svg
        width="64"
        height="52"
        viewBox="0 0 64 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-3 text-slate-400 dark:text-gold-400/50"
        aria-hidden="true"
      >
        <path
          d="M8 42H56M14 42V18L24 12V42M28 42V8L42 14V42M46 42V24L54 28V42"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 47C14 44 22 49 32 46C42 43 50 48 58 45"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-xs font-semibold text-slate-700 dark:text-text-primary">
        Nenhum lead nesta etapa
      </p>
      <p className="mt-1 text-[11px] text-slate-500 dark:text-text-muted">
        Arraste um card ou aguarde novas captações.
      </p>
    </motion.div>
  );
}
