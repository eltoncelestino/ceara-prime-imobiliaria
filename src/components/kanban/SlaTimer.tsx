"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface SlaTimerProps {
  handoffAt?: string | null;
  assumedAt?: string | null;
  slaBreached: boolean;
  onReassign?: () => void;
}

function formatDuration(seconds: number): string {
  const abs = Math.max(0, Math.floor(seconds));
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export function SlaTimer({
  handoffAt,
  assumedAt,
  slaBreached,
  onReassign,
}: SlaTimerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [elapsedSec, setElapsedSec] = useState<number>(() => {
    if (!handoffAt) return 0;
    return Math.floor((Date.now() - new Date(handoffAt).getTime()) / 1000);
  });

  useEffect(() => {
    if (!handoffAt || assumedAt) return;
    const interval = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - new Date(handoffAt).getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [handoffAt, assumedAt]);

  if (assumedAt || (!slaBreached && !handoffAt)) return null;

  const isBreached = slaBreached || elapsedSec >= 120;
  const remainingSec = Math.max(0, 120 - elapsedSec);
  const progressPct = Math.min(100, (elapsedSec / 120) * 100);

  if (isBreached) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-xl border border-rose-500/40 bg-rose-500/15 px-2.5 py-1.5 text-rose-300">
        <div className="flex min-w-0 items-center gap-1.5">
          <motion.span
            animate={
              shouldReduceMotion ? undefined : { rotate: [-8, 8, -8, 0] }
            }
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
          >
            <AlertTriangle
              className="h-3.5 w-3.5 shrink-0 text-rose-500"
              strokeWidth={1.5}
            />
          </motion.span>
          <span className="tabular-nums truncate text-[11px] font-semibold">
            SLA estourado · {formatDuration(elapsedSec || 134)}
          </span>
        </div>

        <button
          type="button"
          onClick={onReassign}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white transition hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <RefreshCw className="h-2.5 w-2.5" strokeWidth={1.5} />
          Reatribuir
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1 rounded-xl border border-amber-400/30 bg-amber-400/10 px-2.5 py-1.5">
      <div className="flex items-center justify-between text-[11px] font-semibold text-amber-400">
        <span>SLA de aceite</span>
        <span className="tabular-nums">{formatDuration(remainingSec)}</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-amber-400/20">
        <motion.div
          className="h-full rounded-full bg-amber-400"
          initial={{ width: `${progressPct}%` }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}
