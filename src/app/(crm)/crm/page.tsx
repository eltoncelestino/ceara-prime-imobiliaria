"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  ShieldAlert,
  X,
  Zap,
} from "lucide-react";
import { MOCK_BROKERS, MOCK_LEADS, MOCK_PROPERTIES } from "@/data/mockData";
import { useChatState } from "@/hooks/useChatState";
import type { LeadCardData, LeadStatusType, ToastMessage } from "@/types/realestate";
import { Header, type ActiveTab } from "@/components/layout/Header";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { NeighborhoodFilter } from "@/components/dashboard/NeighborhoodFilter";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { ChatFab } from "@/components/chat/ChatFab";
import { CommandPalette } from "@/components/ui/CommandPalette";

export default function CrmDashboardPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<ActiveTab>("SPLIT");
  const [darkMode, setDarkMode] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);

  const {
    mode: chatMode,
    unreadCount,
    lastPreview,
    minimizeChat,
    expandChat,
    toggleFullscreen,
    notifyIncoming,
  } = useChatState("expanded");

  const [leads, setLeads] = useState<LeadCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [neighborhood, setNeighborhood] = useState("TODOS");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback(
    (
      title: string,
      description?: string,
      variant: ToastMessage["variant"] = "success"
    ) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    },
    []
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/leads?neighborhood=${encodeURIComponent(neighborhood)}`
      );
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads?.length ? data.leads : MOCK_LEADS);
      } else {
        setLeads(MOCK_LEADS);
      }
    } catch {
      setLeads(MOCK_LEADS);
    } finally {
      setLoading(false);
    }
  }, [neighborhood]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleAssumeLead = async (leadId: string) => {
    const target = leads.find((l) => l.id === leadId);
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              assumedAt: new Date().toISOString(),
              slaBreached: false,
            }
          : l
      )
    );
    pushToast(
      "Atendimento assumido",
      target ? `Lead ${target.name} em atendimento.` : undefined
    );

    try {
      await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assumeLead: true }),
      });
    } catch {
      // Modo demo
    }
  };

  const handleReassignLead = (leadId: string) => {
    const target = leads.find((l) => l.id === leadId);
    const currentBrokerId = target?.assignedBroker?.id;
    const nextBroker =
      MOCK_BROKERS.find((b) => b.id !== currentBrokerId) ?? MOCK_BROKERS[1];

    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              assignedBroker: nextBroker,
              handoffAt: new Date().toISOString(),
              slaBreached: false,
            }
          : l
      )
    );
    pushToast(
      `Lead reatribuído para ${nextBroker.name}`,
      target ? `${target.name} • Novo SLA de 2 minutos iniciado.` : undefined,
      "info"
    );
  };

  const handleMoveLead = async (leadId: string, newStatus: LeadStatusType) => {
    const target = leads.find((l) => l.id === leadId);
    if (!target || target.status === newStatus) return;

    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    pushToast("Estágio atualizado", `${target.name} movido no pipeline.`);

    try {
      await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch {
      // Modo demo
    }
  };

  const visibleLeads =
    neighborhood === "TODOS"
      ? leads
      : leads.filter((l) => l.preferredNeighborhood === neighborhood);

  const showSideChat = activeTab === "SPLIT" && chatMode === "expanded";

  return (
    <MotionConfig reducedMotion="user">
      <div className="noise-overlay relative flex h-dvh flex-col overflow-hidden">
        <Header
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === "CHAT") expandChat();
          }}
          onOpenCommandPalette={() => setCommandOpen(true)}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((d) => !d)}
        />

        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="mx-auto w-full max-w-[1720px] shrink-0 px-5 pt-4 sm:px-7"
        >
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <KpiCard
              label="1ª Resposta (n8n)"
              numericValue={0.7}
              decimals={1}
              suffix="s"
              sub="Meta Ads & Zap → WhatsApp"
              tooltip="Tempo médio p95 entre webhook e disparo no WhatsApp"
              icon={Zap}
              pulseIcon
              iconColorClass="text-emerald-500"
            />
            <KpiCard
              label="Regra SLA Transbordo"
              numericValue={2}
              suffix="m 00s"
              sub="Alerta Telegram: Roberto Viana"
              tooltip="Sem aceite em 2 minutos, escala para o gerente e reatribui"
              icon={ShieldAlert}
              iconColorClass="text-amber-400"
            />
            <KpiCard
              label="Praças Fortaleza"
              numericValue={5}
              suffix=" bairros"
              sub="Meireles, Aldeota, Cocó, Dionísio, Beira-Mar"
              tooltip="Bairros de atuação com corretores plantonistas"
              icon={MapPin}
              iconColorClass="text-gold-400"
            />
            <KpiCard
              label="Taxa Anti-No-Show"
              numericValue={94}
              suffix="%"
              sub="Lembretes D-1, 2h e Maps 1-toque"
              tooltip="Comparecimento em visitas confirmadas pelo WhatsApp"
              icon={Clock}
              iconColorClass="text-emerald-500"
            />
          </div>
        </motion.section>

        <section className="mx-auto flex w-full max-w-[1720px] shrink-0 flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-7">
          <NeighborhoodFilter
            selected={neighborhood}
            onSelect={setNeighborhood}
          />
          <button
            type="button"
            onClick={fetchLeads}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-900 transition hover:border-gold-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 dark:border-white/10 dark:bg-ink-800 dark:text-text-primary"
          >
            <RefreshCw className="h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
            Atualizar Fila
          </button>
        </section>

        <main className="mx-auto flex min-h-0 w-full max-w-[1720px] flex-1 gap-5 px-5 pb-4 sm:px-7">
          {activeTab !== "CHAT" && (
            <motion.div layout className="min-h-0 flex-1 overflow-hidden">
              <KanbanBoard
                leads={visibleLeads}
                loading={loading}
                onAssume={handleAssumeLead}
                onReassign={handleReassignLead}
                onMoveLead={handleMoveLead}
              />
            </motion.div>
          )}

          <AnimatePresence>
            {showSideChat && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 400 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="hidden h-full min-h-0 shrink-0 xl:block"
              >
                <ChatPanel
                  mode={chatMode}
                  onMinimize={minimizeChat}
                  onToggleFullscreen={toggleFullscreen}
                  onScheduleToast={(t, d) => pushToast(t, d, "success")}
                  onIncomingWhileMinimized={notifyIncoming}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {activeTab === "CHAT" && (
            <div className="mx-auto h-full min-h-0 w-full max-w-2xl">
              <ChatPanel
                mode={chatMode}
                onMinimize={() => setActiveTab("SPLIT")}
                onToggleFullscreen={toggleFullscreen}
                onScheduleToast={(t, d) => pushToast(t, d, "success")}
                onIncomingWhileMinimized={notifyIncoming}
              />
            </div>
          )}
        </main>

        <AnimatePresence>
          {chatMode === "fullscreen" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={expandChat}
              className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/75 p-4 backdrop-blur-md"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="h-[85dvh] w-full max-w-3xl"
              >
                <ChatPanel
                  mode={chatMode}
                  onMinimize={minimizeChat}
                  onToggleFullscreen={toggleFullscreen}
                  onScheduleToast={(t, d) => pushToast(t, d, "success")}
                  onIncomingWhileMinimized={notifyIncoming}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeTab === "SPLIT" && chatMode === "expanded" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={minimizeChat}
              className="fixed inset-0 z-40 flex items-end bg-ink-950/65 backdrop-blur-sm xl:hidden"
            >
              <motion.div
                initial={shouldReduceMotion ? false : { y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 110) minimizeChat();
                }}
                onClick={(e) => e.stopPropagation()}
                className="flex h-[75dvh] w-full flex-col rounded-t-3xl border-t border-gold-400/30 bg-ink-950 p-3 shadow-2xl"
              >
                <div className="mb-2 flex items-center justify-between px-2">
                  <div className="mx-auto h-1.5 w-12 rounded-full bg-ink-700" />
                  <button
                    type="button"
                    onClick={minimizeChat}
                    aria-label="Minimizar chat"
                    className="rounded-lg p-1 text-text-muted hover:bg-ink-800"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="min-h-0 flex-1">
                  <ChatPanel
                    mode={chatMode}
                    onMinimize={minimizeChat}
                    onToggleFullscreen={toggleFullscreen}
                    onScheduleToast={(t, d) => pushToast(t, d, "success")}
                    onIncomingWhileMinimized={notifyIncoming}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {(chatMode === "minimized" || activeTab === "KANBAN") && (
          <ChatFab
            unreadCount={unreadCount}
            lastPreview={lastPreview}
            onClick={() => {
              if (activeTab === "KANBAN") setActiveTab("SPLIT");
              expandChat();
            }}
          />
        )}

        <CommandPalette
          isOpen={commandOpen}
          onClose={() => setCommandOpen(false)}
          leads={leads}
          properties={MOCK_PROPERTIES}
          brokers={MOCK_BROKERS}
          onSelectNeighborhood={setNeighborhood}
        />

        <div
          aria-live="polite"
          className="pointer-events-none fixed bottom-5 left-5 z-50 flex flex-col gap-2"
        >
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 16, scale: 0.95 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="pointer-events-auto flex items-start gap-2.5 rounded-2xl border border-gold-400/35 bg-ink-900/95 px-4 py-3 text-text-primary shadow-xl backdrop-blur-xl"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                  strokeWidth={1.5}
                />
                <div className="text-xs">
                  <p className="font-semibold text-gold-200">{toast.title}</p>
                  {toast.description && (
                    <p className="mt-0.5 text-text-muted">
                      {toast.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
