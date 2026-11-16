"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LeadCardData, LeadStatusType } from "@/types/realestate";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanSkeleton } from "../ui/Skeletons";

export const KANBAN_COLUMNS: {
  status: LeadStatusType;
  title: string;
  accentClass: string;
}[] = [
  { status: "NEW", title: "Novo", accentClass: "bg-sky-400" },
  { status: "QUALIFIED", title: "Qualificado", accentClass: "bg-amber-400" },
  {
    status: "VISIT_SCHEDULED",
    title: "Visita Agendada",
    accentClass: "bg-emerald-500",
  },
  { status: "PROPOSAL", title: "Proposta", accentClass: "bg-gold-400" },
  { status: "CLOSED_WON", title: "Fechado", accentClass: "bg-emerald-500" },
];

interface KanbanBoardProps {
  leads: LeadCardData[];
  loading: boolean;
  onAssume: (leadId: string) => void;
  onReassign: (leadId: string) => void;
  onMoveLead: (leadId: string, newStatus: LeadStatusType) => void;
}

export function KanbanBoard({
  leads,
  loading,
  onAssume,
  onReassign,
  onMoveLead,
}: KanbanBoardProps) {
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [mobileColumn, setMobileColumn] = useState<LeadStatusType>("NEW");

  if (loading) {
    return <KanbanSkeleton />;
  }

  const handleDropOnColumn = (targetStatus: LeadStatusType) => {
    if (draggingLeadId) {
      onMoveLead(draggingLeadId, targetStatus);
      setDraggingLeadId(null);
    }
  };

  return (
    <motion.div layout className="flex h-full min-h-0 flex-col gap-3">
      {/* Mobile: abas por coluna */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-luxury md:hidden">
        {KANBAN_COLUMNS.map((col) => {
          const count = leads.filter((l) => l.status === col.status).length;
          const isActive = mobileColumn === col.status;
          return (
            <button
              key={col.status}
              type="button"
              onClick={() => setMobileColumn(col.status)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                isActive
                  ? "border border-gold-400/50 bg-ink-800 text-gold-200"
                  : "border border-white/10 bg-ink-900 text-text-muted"
              }`}
            >
              <span>{col.title}</span>
              <span className="tabular-nums opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Mobile: coluna única selecionada */}
      <div className="min-h-0 flex-1 md:hidden">
        {KANBAN_COLUMNS.filter((c) => c.status === mobileColumn).map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            title={col.title}
            accentClass={col.accentClass}
            leads={leads.filter((l) => l.status === col.status)}
            onAssume={onAssume}
            onReassign={onReassign}
            onDragStartLead={setDraggingLeadId}
            onDropOnColumn={handleDropOnColumn}
          />
        ))}
      </div>

      {/* Desktop: colunas w-[320px] shrink-0 sem sobreposição */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.06 },
          },
        }}
        className="hidden min-h-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3 scrollbar-luxury md:flex"
      >
        {KANBAN_COLUMNS.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            title={col.title}
            accentClass={col.accentClass}
            leads={leads.filter((l) => l.status === col.status)}
            onAssume={onAssume}
            onReassign={onReassign}
            onDragStartLead={setDraggingLeadId}
            onDropOnColumn={handleDropOnColumn}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
