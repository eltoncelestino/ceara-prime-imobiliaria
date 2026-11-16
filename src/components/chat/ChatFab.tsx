"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot } from "lucide-react";

interface ChatFabProps {
  unreadCount: number;
  lastPreview: string | null;
  onClick: () => void;
}

export function ChatFab({ unreadCount, lastPreview, onClick }: ChatFabProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
      {/* Prévia flutuante ao chegar mensagem com chat minimizado */}
      <AnimatePresence>
        {lastPreview && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 16, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12 }}
            onClick={onClick}
            className="hidden max-w-xs cursor-pointer rounded-2xl border border-gold-400/40 bg-ink-900/95 px-4 py-2.5 text-xs text-text-primary shadow-xl backdrop-blur-xl sm:block"
          >
            <p className="font-semibold text-gold-400">Concierge IA</p>
            <p className="mt-0.5 line-clamp-2 text-text-muted">{lastPreview}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        layoutId="ceara-prime-chat-morph"
        onClick={onClick}
        aria-label="Abrir Concierge IA (atalho C)"
        title="Abrir Concierge IA (C)"
        animate={
          unreadCount > 0 && !shouldReduceMotion
            ? { rotate: [0, -8, 8, -5, 5, 0] }
            : { rotate: 0 }
        }
        transition={{ duration: 0.5 }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
        className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full border border-gold-400/50 bg-ink-900 text-gold-200 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
      >
        {!shouldReduceMotion && (
          <span className="animate-pulse-ring pointer-events-none absolute inset-0 rounded-full bg-emerald-500/40" />
        )}
        <Bot className="relative z-10 h-6 w-6 text-emerald-500" strokeWidth={1.5} />

        {unreadCount > 0 && (
          <span className="tabular-nums absolute -right-1 -top-1 z-20 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[11px] font-bold text-white ring-2 ring-ink-950">
            {unreadCount}
          </span>
        )}
      </motion.button>
    </div>
  );
}
