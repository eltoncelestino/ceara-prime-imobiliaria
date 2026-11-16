"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  Calendar,
  CheckCircle2,
  MapPin,
  Maximize2,
  Minimize2,
  Minus,
  RotateCcw,
  Send,
  Zap,
} from "lucide-react";
import { MOCK_PROPERTIES } from "@/data/mockData";
import type { ChatViewMode } from "@/hooks/useChatState";
import type {
  ChatBubbleMessage,
  LeadObjectiveType,
  PropertyCardData,
} from "@/types/realestate";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { PropertyCardSkeleton } from "../ui/Skeletons";

type QualificationStep =
  | "OBJECTIVE"
  | "BUDGET"
  | "NEIGHBORHOOD"
  | "RESULTS"
  | "SCHEDULED";

interface ChatPanelProps {
  mode: ChatViewMode;
  onMinimize: () => void;
  onToggleFullscreen: () => void;
  onScheduleToast?: (title: string, description: string) => void;
  onIncomingWhileMinimized?: (preview: string) => void;
}

const INITIAL_MESSAGES: ChatBubbleMessage[] = [
  {
    id: "welcome-1",
    sender: "AI",
    timestamp: "Agora · < 1s n8n",
    content:
      "Olá! Sou a assistente virtual da Ceará Prime Imóveis. Vi seu interesse em imóveis em Fortaleza. Qual o seu principal objetivo hoje?",
  },
];

export function ChatPanel({
  mode,
  onMinimize,
  onToggleFullscreen,
  onScheduleToast,
  onIncomingWhileMinimized,
}: ChatPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<ChatBubbleMessage[]>(INITIAL_MESSAGES);
  const [step, setStep] = useState<QualificationStep>("OBJECTIVE");
  const [objective, setObjective] = useState<LeadObjectiveType>("COMPRAR");
  const [budgetMax, setBudgetMax] = useState<number>(1500000);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [planeLaunched, setPlaneLaunched] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [messages, isTyping, shouldReduceMotion]);

  const appendMessage = (msg: Omit<ChatBubbleMessage, "id" | "timestamp">) => {
    setMessages((prev) => [
      ...prev,
      {
        ...msg,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    if (msg.sender === "AI") {
      onIncomingWhileMinimized?.(msg.content);
    }
  };

  const handleSelectObjective = (selected: LeadObjectiveType, label: string) => {
    setObjective(selected);
    appendMessage({ sender: "USER", content: label });
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setStep("BUDGET");
      appendMessage({
        sender: "AI",
        content:
          selected === "ALUGAR"
            ? "Perfeito! Para locação em Fortaleza, qual faixa de valor mensal você busca?"
            : "Excelente! Qual a faixa de investimento em Reais que você planeja?",
      });
    }, 550);
  };

  const handleSelectBudget = (max: number, label: string) => {
    setBudgetMax(max);
    appendMessage({ sender: "USER", content: label });
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setStep("NEIGHBORHOOD");
      appendMessage({
        sender: "AI",
        content:
          "Ótimo! Em qual bairro nobre de Fortaleza você tem preferência?",
      });
    }, 550);
  };

  const handleSelectNeighborhood = async (neighborhood: string) => {
    appendMessage({ sender: "USER", content: neighborhood });
    setIsTyping(true);

    let properties: PropertyCardData[] = [];
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objective, budgetMax, neighborhood }),
      });
      if (res.ok) {
        const data = await res.json();
        properties = data.properties ?? [];
      }
    } catch {
      // Fallback para dados mock
    }

    if (properties.length === 0) {
      properties = MOCK_PROPERTIES.filter(
        (p) => p.neighborhood.toLowerCase() === neighborhood.toLowerCase()
      );
      if (properties.length === 0) properties = MOCK_PROPERTIES.slice(0, 3);
    }

    setTimeout(() => {
      setIsTyping(false);
      setStep("RESULTS");
      appendMessage({
        sender: "AI",
        content: `Separei ${properties.length} ${
          properties.length === 1 ? "opção exclusiva" : "opções exclusivas"
        } no ${neighborhood} alinhadas ao seu perfil:`,
        propertyCards: properties,
      });
    }, 650);
  };

  const handleScheduleProperty = (property: PropertyCardData) => {
    appendMessage({
      sender: "USER",
      content: `Quero agendar visita no ${property.title} (${property.code}).`,
    });
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setStep("SCHEDULED");
      appendMessage({
        sender: "AI",
        content:
          `✅ Pré-reserva confirmada com o corretor Carlos Eduardo (CRECI 15423-F) para amanhã às 10h30!\n\n` +
          `📍 Lembretes D-1 e 2h antes + rota do Google Maps para ${property.neighborhood} enviados no WhatsApp.`,
      });
      onScheduleToast?.(
        "Visita agendada via Concierge IA",
        `${property.title} • Corretor Carlos Eduardo`
      );
    }, 550);
  };

  const handleSendFreeText = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    setPlaneLaunched(true);
    setTimeout(() => setPlaneLaunched(false), 450);
    setInputValue("");

    if (step === "OBJECTIVE") {
      const lower = text.toLowerCase();
      if (lower.includes("alug")) return handleSelectObjective("ALUGAR", text);
      if (lower.includes("invest")) return handleSelectObjective("INVESTIR", text);
      return handleSelectObjective("COMPRAR", text);
    }
    if (step === "BUDGET") return handleSelectBudget(1500000, text);
    if (step === "NEIGHBORHOOD") {
      const matched =
        ["Meireles", "Aldeota", "Cocó", "Dionísio Torres", "Beira-Mar"].find((b) =>
          text.toLowerCase().includes(b.toLowerCase())
        ) ?? "Meireles";
      return handleSelectNeighborhood(matched);
    }

    appendMessage({ sender: "USER", content: text });
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      appendMessage({
        sender: "AI",
        content:
          "Recebido! Nosso corretor especialista já recebeu todo o histórico desta conversa.",
      });
    }, 500);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setStep("OBJECTIVE");
    setIsTyping(false);
  };

  return (
    <motion.aside
      layoutId="ceara-prime-chat-morph"
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 260, damping: 26 }
      }
      aria-label="Painel de Chat Concierge IA"
      className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-ink-card"
    >
      {/* Header do Chat */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-ink-950/90 px-4 py-3.5 text-text-primary">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold-400/35 bg-ink-800">
            <Bot className="h-5 w-5 text-emerald-500" strokeWidth={1.5} />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-950 bg-emerald-500" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold">Concierge IA</h3>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                <Zap className="h-2.5 w-2.5" strokeWidth={1.5} /> &lt; 1s
              </span>
            </div>
            <p className="truncate text-[11px] text-text-muted">
              WhatsApp &amp; Web • Fortaleza-CE
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reiniciar conversa"
            title="Reiniciar conversa"
            className="rounded-lg p-1.5 text-text-muted transition hover:bg-ink-800 hover:text-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-label={
              mode === "fullscreen" ? "Sair da tela cheia" : "Expandir em tela cheia"
            }
            title={mode === "fullscreen" ? "Restaurar painel" : "Tela cheia"}
            className="hidden rounded-lg p-1.5 text-text-muted transition hover:bg-ink-800 hover:text-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:inline-flex"
          >
            {mode === "fullscreen" ? (
              <Minimize2 className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
          <button
            type="button"
            onClick={onMinimize}
            aria-label="Minimizar chat (Esc)"
            title="Minimizar (Esc)"
            className="rounded-lg p-1.5 text-text-muted transition hover:bg-ink-800 hover:text-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <Minus className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Área de mensagens */}
      <div
        ref={scrollRef}
        aria-live="polite"
        className="flex-1 space-y-4 overflow-y-auto p-4 scrollbar-luxury"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onScheduleProperty={handleScheduleProperty}
            />
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="space-y-3">
            <TypingIndicator />
            {step === "NEIGHBORHOOD" && (
              <div className="flex gap-3 overflow-hidden">
                <PropertyCardSkeleton />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Replies */}
      <div className="shrink-0 border-t border-white/10 bg-ink-950/60 px-4 py-2.5">
        {step === "OBJECTIVE" && (
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["COMPRAR", "Comprar Imóvel"],
                ["ALUGAR", "Alugar"],
                ["INVESTIR", "Investir em Fortaleza"],
              ] as const
            ).map(([val, label], i) => (
              <motion.button
                key={val}
                type="button"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                onClick={() => handleSelectObjective(val, label)}
                className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-500 transition hover:bg-emerald-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                {label}
              </motion.button>
            ))}
          </div>
        )}

        {step === "BUDGET" && (
          <div className="flex flex-wrap gap-2">
            {[
              { max: 800000, label: "Até R$ 800 mil" },
              { max: 1500000, label: "R$ 800 mil a R$ 1,5M" },
              { max: 4000000, label: "Acima de R$ 1,5M" },
            ].map((b, i) => (
              <motion.button
                key={b.max}
                type="button"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                onClick={() => handleSelectBudget(b.max, b.label)}
                className="rounded-full border border-gold-400/35 bg-ink-800 px-3.5 py-1.5 text-xs font-semibold text-gold-200 transition hover:border-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                {b.label}
              </motion.button>
            ))}
          </div>
        )}

        {step === "NEIGHBORHOOD" && (
          <div className="flex flex-wrap gap-1.5">
            {["Meireles", "Aldeota", "Cocó", "Dionísio Torres", "Beira-Mar"].map(
              (bairro, i) => (
                <motion.button
                  key={bairro}
                  type="button"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                  onClick={() => handleSelectNeighborhood(bairro)}
                  className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-500 transition hover:bg-emerald-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <MapPin className="h-3 w-3" strokeWidth={1.5} />
                  {bairro}
                </motion.button>
              )
            )}
          </div>
        )}

        {step === "SCHEDULED" && (
          <div className="flex items-center justify-between text-xs text-emerald-500">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} />
              Anti-no-show ativo (D-1 e 2h antes)
            </span>
            <span className="inline-flex items-center gap-1 text-text-muted">
              <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
              Amanhã, 10:30
            </span>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendFreeText}
        className="flex shrink-0 items-center gap-2 border-t border-white/10 bg-ink-950/90 px-4 py-3"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua mensagem ou escolha acima..."
          className="flex-1 rounded-xl border border-white/10 bg-ink-800 px-3.5 py-2 text-sm text-text-primary placeholder-text-muted focus:border-gold-400/60 focus:outline-none"
        />
        <motion.button
          type="submit"
          aria-label="Enviar mensagem"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-emerald-500 text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <motion.span
            animate={
              planeLaunched && !shouldReduceMotion
                ? { x: [0, 14, -14, 0], y: [0, -14, 14, 0], opacity: [1, 0, 0, 1] }
                : { x: 0, y: 0, opacity: 1 }
            }
            transition={{ duration: 0.4 }}
          >
            <Send className="h-4 w-4" strokeWidth={1.5} />
          </motion.span>
        </motion.button>
      </form>
    </motion.aside>
  );
}
