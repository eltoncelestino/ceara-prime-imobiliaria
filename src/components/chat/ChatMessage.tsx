"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ChatBubbleMessage, PropertyCardData } from "@/types/realestate";
import { PropertyCard } from "./PropertyCard";

interface ChatMessageProps {
  message: ChatBubbleMessage;
  onScheduleProperty: (property: PropertyCardData) => void;
}

export function ChatMessage({
  message,
  onScheduleProperty,
}: ChatMessageProps) {
  const shouldReduceMotion = useReducedMotion();
  const isUser = message.sender === "USER";

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-sm border border-gold-400/30 bg-ink-700 text-text-primary"
            : "rounded-bl-sm border border-white/10 bg-ink-800 text-text-primary"
        }`}
      >
        <p className="whitespace-pre-line">{message.content}</p>
        <span className="mt-1 block text-[10px] text-text-muted">
          {message.timestamp}
        </span>
      </div>

      {message.propertyCards && message.propertyCards.length > 0 && (
        <div className="mt-3 flex w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scrollbar-luxury">
          {message.propertyCards.map((prop, idx) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              index={idx}
              onScheduleClick={onScheduleProperty}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
