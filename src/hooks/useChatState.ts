"use client";

import { useCallback, useEffect, useState } from "react";

export type ChatViewMode = "expanded" | "minimized" | "fullscreen";

const STORAGE_KEY = "ceara_prime_chat_mode";

export function useChatState(defaultMode: ChatViewMode = "expanded") {
  const [mode, setMode] = useState<ChatViewMode>(defaultMode);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [lastPreview, setLastPreview] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as ChatViewMode | null;
      if (saved === "expanded" || saved === "minimized" || saved === "fullscreen") {
        setMode(saved);
      }
    } catch {
      // Ignora em ambientes restritos
    }
  }, []);

  const updateMode = useCallback((next: ChatViewMode) => {
    setMode(next);
    if (next !== "minimized") {
      setUnreadCount(0);
      setLastPreview(null);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignora
    }
  }, []);

  const toggleChat = useCallback(() => {
    updateMode(mode === "minimized" ? "expanded" : "minimized");
  }, [mode, updateMode]);

  const minimizeChat = useCallback(() => updateMode("minimized"), [updateMode]);
  const expandChat = useCallback(() => updateMode("expanded"), [updateMode]);
  const toggleFullscreen = useCallback(
    () => updateMode(mode === "fullscreen" ? "expanded" : "fullscreen"),
    [mode, updateMode]
  );

  const notifyIncoming = useCallback(
    (previewText: string) => {
      if (mode === "minimized") {
        setUnreadCount((c) => c + 1);
        setLastPreview(previewText);
      }
    },
    [mode]
  );

  // Atalhos: "C" alterna o chat (fora de inputs), "Esc" minimiza
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingField =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (e.key === "Escape" && mode !== "minimized") {
        minimizeChat();
        return;
      }

      if (
        !isTypingField &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        e.key.toLowerCase() === "c"
      ) {
        e.preventDefault();
        toggleChat();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, minimizeChat, toggleChat]);

  return {
    mode: hydrated ? mode : defaultMode,
    unreadCount,
    lastPreview,
    toggleChat,
    minimizeChat,
    expandChat,
    toggleFullscreen,
    notifyIncoming,
  };
}
