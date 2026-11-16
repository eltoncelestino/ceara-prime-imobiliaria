"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-gradient-to-r from-gold-400 via-gold-200 to-emerald-500"
    />
  );
}
