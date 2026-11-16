"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LeadCardData, LeadStatusType } from "@/types/realestate";
import { LeadCard } from "./LeadCard";
import { EmptyColumnIllustration } from "../ui/Skeletons";

interface KanbanColumnProps {
  status: LeadStatusType;
  title: string;
  accentClass: string;
  leads: LeadCardData[];
  onAssume: (leadId: string) => void;
  onReassign: (leadId: string) => void;
  onDragStartLead: (leadId: string) => void;
  onDropOnColumn: (status: LeadStatusType) => void;
}

export function KanbanColumn({
  status,
  title,
  accentClass,
  leads,
  onAssume,
  onReassign,
  onDragStartLead,
  onDropOnColumn,
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      role="region"
      aria-label={`Coluna ${title}`}
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0 },
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!isDragOver) setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        onDropOnColumn(status);
      }}
      className={`flex h-full w-[320px] shrink-0 snap-start flex-col rounded-3xl border p-3.5 transition-colors ${
        isDragOver
          ? "border-gold-400 bg-ink-900 ring-2 ring-gold-400/35"
          : "border-slate-200/80 bg-slate-100/70 dark:border-white/5 dark:bg-ink-900"
      }`}
    >
      <div className="mb-3 flex shrink-0 items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${accentClass}`} />
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-900 dark:text-gold-400">
            {title}
          </h3>
        </div>
        <span className="tabular-nums rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-ink-900 dark:border-white/10 dark:bg-ink-800 dark:text-gold-200">
          {leads.length}
        </span>
      </div>

      <div className="flex-1 space-y-3.5 overflow-y-auto pr-1 scrollbar-luxury">
        <AnimatePresence mode="popLayout">
          {leads.length > 0 ? (
            leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onAssume={onAssume}
                onReassign={onReassign}
                onDragStartLead={onDragStartLead}
              />
            ))
          ) : (
            <motion.div
              key={`empty-${status}`}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyColumnIllustration />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
