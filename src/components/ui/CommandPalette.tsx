"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2, MapPin, Search, User, UserCheck, X } from "lucide-react";
import type {
  BrokerSummary,
  LeadCardData,
  PropertyCardData,
} from "@/types/realestate";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadCardData[];
  properties: PropertyCardData[];
  brokers: BrokerSummary[];
  onSelectNeighborhood: (neighborhood: string) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  leads,
  properties,
  brokers,
  onSelectNeighborhood,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const q = query.trim().toLowerCase();
  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      (l.preferredNeighborhood ?? "").toLowerCase().includes(q)
  );
  const filteredProps = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.neighborhood.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q)
  );
  const filteredBrokers = brokers.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.creci.toLowerCase().includes(q)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink-950/75 p-4 pt-20 backdrop-blur-md"
        >
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: -12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Busca global"
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-gold-400/30 bg-ink-900 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="h-4 w-4 text-gold-400" strokeWidth={1.5} />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar leads, imóveis ou corretores..."
                className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar busca"
                className="rounded-lg p-1 text-text-muted transition hover:bg-ink-800 hover:text-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="max-h-96 space-y-4 overflow-y-auto p-4 scrollbar-luxury">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                  Leads ({filteredLeads.length})
                </p>
                <div className="space-y-1">
                  {filteredLeads.slice(0, 4).map((lead) => (
                    <button
                      key={lead.id}
                      type="button"
                      onClick={() => {
                        if (lead.preferredNeighborhood) {
                          onSelectNeighborhood(lead.preferredNeighborhood);
                        }
                        onClose();
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition hover:bg-ink-800"
                    >
                      <span className="flex items-center gap-2 font-semibold text-text-primary">
                        <User className="h-3.5 w-3.5 text-emerald-500" strokeWidth={1.5} />
                        {lead.name}
                      </span>
                      <span className="inline-flex items-center gap-1 text-text-muted">
                        <MapPin className="h-3 w-3 text-gold-400" strokeWidth={1.5} />
                        {lead.preferredNeighborhood ?? "Fortaleza"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                  Portfólio Fortaleza ({filteredProps.length})
                </p>
                <div className="space-y-1">
                  {filteredProps.slice(0, 4).map((prop) => (
                    <button
                      key={prop.id}
                      type="button"
                      onClick={() => {
                        onSelectNeighborhood(prop.neighborhood);
                        onClose();
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition hover:bg-ink-800"
                    >
                      <span className="flex items-center gap-2 font-medium text-text-primary">
                        <Building2 className="h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
                        {prop.title}
                      </span>
                      <span className="tabular-nums font-semibold text-gold-200">
                        {prop.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                  Corretores ({filteredBrokers.length})
                </p>
                <div className="space-y-1">
                  {filteredBrokers.map((broker) => (
                    <div
                      key={broker.id}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs"
                    >
                      <span className="flex items-center gap-2 font-medium text-text-primary">
                        <UserCheck className="h-3.5 w-3.5 text-emerald-500" strokeWidth={1.5} />
                        {broker.name}
                      </span>
                      <span className="tabular-nums text-text-muted">
                        CRECI {broker.creci}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
