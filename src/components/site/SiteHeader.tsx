"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";

interface SiteHeaderProps {
  onOpenConcierge: () => void;
}

const NAV_LINKS = [
  { href: "/imoveis", label: "Imóveis" },
  { href: "/#bairros", label: "Bairros" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#equipe", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
];

export function SiteHeader({ onOpenConcierge }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-gold-400/20 bg-navy-950/90 py-3 shadow-lg backdrop-blur-xl"
            : "bg-gradient-to-b from-navy-950/80 to-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/40 bg-navy-900/80 backdrop-blur-md">
              <Building2 className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
            </div>
            <div>
              <span className="block font-serif text-lg font-semibold text-white sm:text-xl">
                Ceará Prime
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                Imóveis S.A.
              </span>
            </div>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-7 lg:flex"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-wider text-slate-200 transition hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href="https://wa.me/5585999110001?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20im%C3%B3veis%20da%20Cear%C3%A1%20Prime%20em%20Fortaleza."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:border-gold-400/50 hover:bg-white/15"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-500" strokeWidth={1.5} />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={onOpenConcierge}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
              Falar com o Concierge
            </button>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menu"
            className="rounded-xl border border-white/20 bg-navy-900/70 p-2 text-white lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Drawer Mobile */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-navy-950/75 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-full w-72 flex-col justify-between border-l border-gold-400/20 bg-navy-950 p-6 text-white"
            >
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-serif text-xl font-semibold text-gold-200">
                    Ceará Prime
                  </span>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Fechar menu"
                    className="rounded-lg p-1.5 text-slate-300 hover:bg-navy-900"
                  >
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>

                <nav className="flex flex-col gap-4">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className="text-sm font-medium text-slate-200 transition hover:text-gold-400"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenConcierge();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-semibold text-white"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  Falar com o Concierge
                </button>
                <Link
                  href="/crm"
                  className="block text-center text-xs text-slate-400 hover:text-gold-400"
                >
                  Acesso da Equipe (CRM)
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
