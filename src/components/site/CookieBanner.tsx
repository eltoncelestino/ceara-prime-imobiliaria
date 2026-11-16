"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = window.localStorage.getItem("cp_lgpd_consent");
      if (!choice) setVisible(true);
    } catch {
      // Ignora
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    try {
      window.localStorage.setItem(
        "cp_lgpd_consent",
        accepted ? "accepted" : "declined"
      );
    } catch {
      // Ignora
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-5 left-5 z-50 max-w-sm rounded-2xl border border-gold-400/30 bg-navy-950/95 p-4 text-xs text-slate-200 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" strokeWidth={1.5} />
            <div>
              <p className="font-semibold text-white">Privacidade &amp; Cookies</p>
              <p className="mt-1 leading-relaxed text-slate-300">
                Utilizamos cookies para personalizar imóveis em Fortaleza e medir conversões (LGPD).
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleChoice(true)}
                  className="rounded-lg bg-emerald-500 px-3 py-1.5 font-semibold text-white hover:bg-emerald-600"
                >
                  Aceitar
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice(false)}
                  className="rounded-lg border border-white/15 px-3 py-1.5 font-medium text-slate-300 hover:bg-white/10"
                >
                  Recusar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
