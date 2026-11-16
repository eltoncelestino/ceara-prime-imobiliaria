"use client";

import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { MOCK_PROPERTIES } from "@/data/mockData";
import { useChatState } from "@/hooks/useChatState";
import type { PropertyCardData } from "@/types/realestate";
import { ScrollProgress } from "./ScrollProgress";
import { SiteHeader } from "./SiteHeader";
import { Hero } from "./Hero";
import { StatsStrip } from "./StatsStrip";
import { FeaturedProperties } from "./FeaturedProperties";
import { NeighborhoodGrid } from "./NeighborhoodGrid";
import { HowItWorks } from "./HowItWorks";
import { ConciergeShowcase } from "./ConciergeShowcase";
import { Differentials } from "./Differentials";
import { BrokerTeam } from "./BrokerTeam";
import { Testimonials } from "./Testimonials";
import { LeadForm } from "./LeadForm";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppButton } from "./WhatsAppButton";
import { CookieBanner } from "./CookieBanner";
import { ChatFab } from "../chat/ChatFab";
import { ChatPanel } from "../chat/ChatPanel";

export function LandingClient() {
  const {
    mode: chatMode,
    unreadCount,
    lastPreview,
    expandChat,
    minimizeChat,
    toggleFullscreen,
    notifyIncoming,
  } = useChatState("minimized");

  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>();

  const handleScheduleProperty = (property: PropertyCardData) => {
    setSelectedPropertyId(property.id);
    expandChat();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh bg-snow-50 text-navy-900">
        <ScrollProgress />
        <SiteHeader onOpenConcierge={expandChat} />

        <main id="main-content">
          <Hero onOpenConcierge={expandChat} />
          <StatsStrip />
          <FeaturedProperties
            properties={MOCK_PROPERTIES}
            onScheduleProperty={handleScheduleProperty}
          />
          <NeighborhoodGrid />
          <HowItWorks />
          <ConciergeShowcase onOpenConcierge={expandChat} />
          <Differentials />
          <BrokerTeam />
          <Testimonials />
          <LeadForm propertyId={selectedPropertyId} />
          <Faq />
          <FinalCta onOpenConcierge={expandChat} />
        </main>

        <SiteFooter />
        <WhatsAppButton />
        <CookieBanner />

        {chatMode === "minimized" && (
          <ChatFab
            unreadCount={unreadCount}
            lastPreview={lastPreview}
            onClick={expandChat}
          />
        )}

        <AnimatePresence>
          {chatMode !== "minimized" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              className={
                chatMode === "fullscreen"
                  ? "fixed inset-0 z-50 flex items-center justify-center bg-navy-950/75 p-4 backdrop-blur-md"
                  : "fixed bottom-5 right-5 z-50 h-[560px] w-[380px] max-w-[calc(100vw-2rem)]"
              }
            >
              <div
                className={
                  chatMode === "fullscreen"
                    ? "h-[85dvh] w-full max-w-3xl"
                    : "h-full w-full"
                }
              >
                <ChatPanel
                  mode={chatMode}
                  onMinimize={minimizeChat}
                  onToggleFullscreen={toggleFullscreen}
                  onIncomingWhileMinimized={notifyIncoming}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
