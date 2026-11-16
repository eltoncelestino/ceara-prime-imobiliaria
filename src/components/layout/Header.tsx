"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Command,
  Kanban,
  MapPin,
  MessageSquareText,
  Moon,
  Search,
  Sun,
  Workflow,
} from "lucide-react";
import { HERO_BEIRA_MAR_IMAGE } from "@/data/mockData";
import { SafeImage } from "../ui/SafeImage";

export type ActiveTab = "SPLIT" | "KANBAN" | "CHAT";

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenCommandPalette: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({
  activeTab,
  onTabChange,
  onOpenCommandPalette,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="relative h-[104px] w-full shrink-0 overflow-hidden bg-ink-950 text-text-primary">
      {/* Foto da Orla de Fortaleza ao entardecer com mask-image */}
      <div className="header-hero-mask absolute inset-0">
        <SafeImage
          src={HERO_BEIRA_MAR_IMAGE}
          alt="Orla da Avenida Beira-Mar em Fortaleza ao anoitecer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-ink-950/85" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1720px] items-center justify-between gap-4 px-5 sm:px-7">
        {/* Logotipo & Endereço */}
        <div className="flex min-w-0 items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-gold-400/40 bg-ink-900/80 shadow-gold-glow backdrop-blur-xl">
            <Building2 className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-serif text-xl font-semibold tracking-normal text-text-primary sm:text-2xl">
                Ceará Prime Imóveis S.A.
              </h1>
              <span className="hidden rounded-full border border-gold-400/45 bg-gold-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-200 sm:inline-block">
                PRIVATE CRM
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs tracking-normal text-text-muted">
              <MapPin
                className="h-3.5 w-3.5 shrink-0 text-gold-400"
                strokeWidth={1.5}
              />
              <span className="truncate">
                Av. Desembargador Moreira, 1300 - Sala 402, Aldeota • Fortaleza-CE
              </span>
            </p>
          </div>
        </div>

        {/* Controles */}
        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Abrir busca global (Ctrl+K)"
            title="Busca global (⌘K)"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-ink-900/75 px-3 py-2 text-xs font-medium text-text-primary backdrop-blur-md transition hover:border-gold-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 md:inline-flex"
          >
            <Search className="h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
            <span>Buscar</span>
            <kbd className="inline-flex items-center gap-0.5 rounded bg-ink-950 px-1.5 py-0.5 text-[10px] font-semibold text-text-muted">
              <Command className="h-2.5 w-2.5" strokeWidth={1.5} />K
            </kbd>
          </button>

          <nav
            aria-label="Modo de visualização"
            className="hidden items-center gap-1 rounded-2xl border border-white/10 bg-ink-900/80 p-1 backdrop-blur-xl sm:flex"
          >
            {(
              [
                ["SPLIT", "Visão Completa", Workflow],
                ["KANBAN", "Kanban & SLA", Kanban],
                ["CHAT", "Chat Concierge", MessageSquareText],
              ] as const
            ).map(([key, label, Icon]) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onTabChange(key)}
                  className={`relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                    isActive
                      ? "text-white"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="headerActiveTab"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 360, damping: 28 }
                      }
                      className="absolute inset-0 rounded-xl bg-emerald-500 shadow-sm"
                    />
                  )}
                  <Icon className="relative z-10 h-3.5 w-3.5" strokeWidth={1.5} />
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? "Ativar tema claro" : "Ativar tema escuro"}
            title={darkMode ? "Tema claro" : "Tema escuro"}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-ink-900/75 text-gold-200 backdrop-blur-md transition hover:border-gold-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-gold-400" strokeWidth={1.5} />
            ) : (
              <Moon className="h-4 w-4 text-ink-900 dark:text-gold-200" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Filete dourado de 1px sob o header */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
      />
    </header>
  );
}
