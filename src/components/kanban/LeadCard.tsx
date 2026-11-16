"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Globe,
  Megaphone,
  MessageCircle,
  Phone,
  Sparkles,
  UserCheck,
} from "lucide-react";
import type { LeadCardData, LeadSourceType } from "@/types/realestate";
import { SafeImage } from "../ui/SafeImage";
import { ScoreBadge } from "./ScoreBadge";
import { SlaTimer } from "./SlaTimer";

interface LeadCardProps {
  lead: LeadCardData;
  onAssume?: (leadId: string) => void;
  onReassign?: (leadId: string) => void;
  onDragStartLead?: (leadId: string) => void;
}

const SOURCE_META: Record<
  LeadSourceType,
  { label: string; icon: typeof Megaphone }
> = {
  META_ADS: { label: "Meta Ads", icon: Megaphone },
  ZAP_IMOVEIS: { label: "ZapImóveis", icon: Globe },
  SITE_CHAT: { label: "Site Chat", icon: MessageCircle },
  WHATSAPP: { label: "WhatsApp", icon: MessageCircle },
};

function formatRelativeTime(iso?: string): string {
  if (!iso) return "agora";
  const diffMin = Math.max(
    1,
    Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  );
  if (diffMin < 60) return `há ${diffMin} min`;
  return `há ${Math.floor(diffMin / 60)}h`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function LeadCard({
  lead,
  onAssume,
  onReassign,
  onDragStartLead,
}: LeadCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const source = SOURCE_META[lead.source];
  const SourceIcon = source.icon;

  const formattedBudget = lead.budgetMax
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      }).format(lead.budgetMax)
    : "Sob consulta";

  return (
    <motion.article
      layout
      layoutId={lead.id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={
        lead.slaBreached && !lead.assumedAt && !shouldReduceMotion
          ? {
              opacity: 1,
              y: 0,
              boxShadow: [
                "0 0 0 0 rgba(244, 63, 94, 0.35)",
                "0 0 0 6px rgba(244, 63, 94, 0)",
              ],
            }
          : { opacity: 1, y: 0 }
      }
      transition={
        lead.slaBreached && !lead.assumedAt
          ? { duration: 1.6, repeat: Infinity }
          : { type: "spring", stiffness: 320, damping: 26 }
      }
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      draggable
      onDragStart={() => onDragStartLead?.(lead.id)}
      tabIndex={0}
      aria-label={`Lead ${lead.name} - ${lead.preferredNeighborhood ?? "Em triagem"}`}
      className={`group flex cursor-grab flex-col gap-3 rounded-2xl border bg-white p-3.5 shadow-sm transition-all hover:border-gold-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 active:cursor-grabbing dark:bg-ink-800 dark:shadow-ink-card dark:hover:shadow-ink-card-hover ${
        lead.slaBreached && !lead.assumedAt
          ? "border-rose-500/70"
          : "border-slate-200/80 dark:border-white/[0.08]"
      }`}
    >
      {/* 1. Faixa SLA no topo */}
      <SlaTimer
        handoffAt={lead.handoffAt}
        assumedAt={lead.assumedAt}
        slaBreached={lead.slaBreached}
        onReassign={() => onReassign?.(lead.id)}
      />

      {/* 2. Imagem 16/9 com badges nos cantos superiores (sem texto sobreposto abaixo) */}
      {lead.status === "NEW" || !lead.propertyThumbnail ? (
        <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-700 p-3 text-center">
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/15 bg-ink-950/80 px-2.5 py-0.5 text-[10px] font-semibold text-text-primary backdrop-blur-md">
            <SourceIcon className="h-3 w-3 text-gold-400" strokeWidth={1.5} />
            {source.label}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 font-serif text-sm font-bold text-gold-200">
            {getInitials(lead.name)}
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-gold-200">
            <Sparkles className="h-3 w-3 text-gold-400" strokeWidth={1.5} />
            Triagem por IA em andamento
          </p>
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink-900">
          <SafeImage
            src={lead.propertyThumbnail}
            alt={lead.propertyTitle ?? "Imóvel Ceará Prime"}
            fill
            sizes="300px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-ink-950/35" />

          {/* Badge bairro (superior esquerdo) */}
          <span className="absolute left-2 top-2 rounded-full border border-white/15 bg-ink-950/80 px-2.5 py-0.5 text-[10px] font-semibold text-gold-200 backdrop-blur-md">
            {lead.preferredNeighborhood ?? "Fortaleza"}
          </span>

          {/* Badge origem (superior direito) */}
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/15 bg-ink-950/80 px-2.5 py-0.5 text-[10px] font-semibold text-text-primary backdrop-blur-md">
            <SourceIcon className="h-3 w-3 text-gold-400" strokeWidth={1.5} />
            {source.label}
          </span>
        </div>
      )}

      {/* 3. Bloco de Preço, Título do Imóvel e Metadados (fora da imagem, sem corte) */}
      <div className="space-y-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="tabular-nums font-serif text-lg font-bold tracking-normal text-ink-900 dark:text-gold-200">
            {formattedBudget}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-slate-500 dark:text-text-muted">
            <Clock className="h-3 w-3" strokeWidth={1.5} />
            {formatRelativeTime(lead.createdAt)}
          </span>
        </div>

        <p className="line-clamp-1 text-xs font-medium text-slate-600 dark:text-text-primary">
          {lead.propertyTitle ?? "Definindo perfil de imóvel em Fortaleza"}
        </p>

        <p className="tabular-nums text-[11px] text-slate-400 dark:text-text-muted">
          {lead.objective === "ALUGAR"
            ? "Locação Executiva"
            : lead.objective === "INVESTIR"
            ? "Investimento • Alta Liquidez"
            : "3 Quartos · 118 m² · 2 vagas"}
        </p>
      </div>

      {/* 4. Nome do Lead, Telefone e Score em linha própria */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5 dark:border-white/[0.06]">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold text-ink-900 dark:text-text-primary">
            {lead.name}
          </h4>
          <p className="tabular-nums truncate text-xs text-slate-500 dark:text-text-muted">
            {lead.phone}
          </p>
        </div>
        <ScoreBadge score={lead.score} />
      </div>

      {/* 5. Rodapé em duas linhas fixado via mt-auto (nunca sobreposto) */}
      <div className="mt-auto flex flex-col gap-2.5 border-t border-slate-100 pt-2.5 dark:border-white/[0.06]">
        {/* Linha A: Corretor + Ações rápidas */}
        <div className="flex items-center justify-between gap-2">
          {lead.assignedBroker ? (
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="relative h-9 w-9 shrink-0">
                {lead.assignedBroker.avatarUrl ? (
                  <SafeImage
                    src={lead.assignedBroker.avatarUrl}
                    alt={lead.assignedBroker.name}
                    width={36}
                    height={36}
                    sizes="36px"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-ink-700"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-700 text-xs font-bold text-gold-200 ring-2 ring-ink-700">
                    {getInitials(lead.assignedBroker.name)}
                  </div>
                )}
                <span
                  title={
                    lead.assignedBroker.online !== false ? "Online" : "Offline"
                  }
                  className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-ink-800 ${
                    lead.assignedBroker.online !== false
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-xs font-semibold text-ink-900 dark:text-text-primary">
                  {lead.assignedBroker.name}
                </p>
                <p className="tabular-nums truncate text-[11px] text-slate-400 dark:text-text-muted">
                  CRECI {lead.assignedBroker.creci}
                </p>
              </div>
            </div>
          ) : (
            <span className="truncate text-xs text-slate-400 dark:text-text-muted">
              Aguardando atendimento do corretor
            </span>
          )}

          <div className="flex shrink-0 items-center gap-1">
            <a
              href={`https://wa.me/${lead.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir WhatsApp"
              aria-label={`Conversar com ${lead.name} no WhatsApp`}
              className="rounded-lg border border-slate-200 p-1.5 text-emerald-500 transition hover:border-emerald-500/40 hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 dark:border-white/10"
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <a
              href={`tel:+${lead.phone}`}
              title="Ligar para o lead"
              aria-label={`Ligar para ${lead.name}`}
              className="rounded-lg border border-slate-200 p-1.5 text-slate-500 transition hover:border-gold-400/40 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 dark:border-white/10 dark:text-text-muted"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Linha B: Botão de status em linha separada */}
        {!lead.assumedAt && lead.assignedBroker ? (
          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            onClick={() => onAssume?.(lead.id)}
            className="relative inline-flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            {!shouldReduceMotion && (
              <span className="animate-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            )}
            <UserCheck className="relative z-10 h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="relative z-10">Assumir Atendimento</span>
          </motion.button>
        ) : lead.assumedAt ? (
          <div className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 py-1.5 text-xs font-semibold text-emerald-500">
            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.5} />
            Atendimento Assumido
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
