"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5585999110001?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Cear%C3%A1%20Prime%20Im%C3%B3veis."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      title="Falar pelo WhatsApp"
      className="fixed bottom-5 right-24 z-40 flex h-[54px] w-[54px] items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500 text-white shadow-xl transition hover:scale-105 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
    </a>
  );
}
