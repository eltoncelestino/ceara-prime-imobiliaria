"use client";

import { motion, useReducedMotion } from "framer-motion";

export function TypingIndicator() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm border border-white/10 bg-ink-800 px-4 py-3 shadow-sm"
      aria-label="Assistente digitando"
    >
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-2 w-2 rounded-full bg-emerald-500"
            animate={
              shouldReduceMotion
                ? undefined
                : { y: [0, -5, 0], opacity: [0.4, 1, 0.4] }
            }
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: dot * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-text-muted">
        Concierge IA consultando portfólio...
      </span>
    </div>
  );
}
