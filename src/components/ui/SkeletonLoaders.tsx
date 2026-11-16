"use client";

import { motion } from "framer-motion";

export function KanbanSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, colIdx) => (
        <div
          key={colIdx}
          className="rounded-2xl border border-slate-200/80 bg-snow-100 p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="h-4 w-28 animate-pulse rounded-md bg-slate-200" />
            <div className="h-5 w-7 animate-pulse rounded-full bg-slate-200" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: colIdx % 2 === 0 ? 2 : 3 }).map((_, cardIdx) => (
              <motion.div
                key={cardIdx}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 0.85, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm"
              >
                <div className="mb-2 h-4 w-3/4 rounded bg-slate-200" />
                <div className="mb-3 h-3 w-1/2 rounded bg-slate-100" />
                <div className="flex items-center justify-between">
                  <div className="h-5 w-16 rounded-full bg-slate-100" />
                  <div className="h-6 w-6 rounded-full bg-slate-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="w-72 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-36 w-full animate-pulse bg-slate-200" />
      <div className="space-y-2.5 p-3.5">
        <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
        <div className="h-5 w-2/5 animate-pulse rounded bg-emerald-100" />
        <div className="h-8 w-full animate-pulse rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}
