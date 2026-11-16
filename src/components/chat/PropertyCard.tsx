"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BedDouble,
  CalendarCheck,
  Car,
  ExternalLink,
  Maximize2,
  Waves,
} from "lucide-react";
import type { PropertyCardData } from "@/types/realestate";
import { SafeImage } from "../ui/SafeImage";

interface PropertyCardProps {
  property: PropertyCardData;
  index?: number;
  onScheduleClick?: (property: PropertyCardData) => void;
  onDetailsClick?: (property: PropertyCardData) => void;
}

export function formatBRL(value: number, isRent = false): string {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
  return isRent ? `${formatted}/mês` : formatted;
}

export function PropertyCard({
  property,
  index = 0,
  onScheduleClick,
  onDetailsClick,
}: PropertyCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isRent = property.objective === "ALUGAR" || property.price < 30000;
  const mapsUrl =
    property.latitude && property.longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${property.latitude},${property.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${property.neighborhood}, Fortaleza - CE`
        )}`;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      className="group w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-ink-card transition-all hover:border-gold-400/40"
    >
      <div className="relative h-40 w-full overflow-hidden bg-ink-900">
        <SafeImage
          src={property.imageUrl}
          alt={property.title}
          fill
          sizes="288px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-ink-950/35" />

        <div className="absolute left-2.5 top-2.5 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-white/15 bg-ink-950/80 px-2.5 py-0.5 text-[10px] font-semibold text-gold-200 backdrop-blur-md">
            {property.neighborhood}
          </span>
          {property.oceanView && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
              <Waves className="h-3 w-3" strokeWidth={1.5} />
              Vista Mar
            </span>
          )}
        </div>

        <div className="absolute bottom-2.5 left-3 right-3 flex items-baseline justify-between">
          <span className="tabular-nums font-serif text-lg font-bold text-gold-200 drop-shadow">
            {formatBRL(property.price, isRent)}
          </span>
          <span className="text-[10px] font-medium text-text-muted">
            {property.code}
          </span>
        </div>
      </div>

      <div className="space-y-3 p-3.5">
        <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-text-primary">
          {property.title}
        </h4>

        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="tabular-nums inline-flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
            {property.bedrooms} qtos
          </span>
          <span className="tabular-nums inline-flex items-center gap-1">
            <Maximize2 className="h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
            {property.areaSqm} m²
          </span>
          <span className="tabular-nums inline-flex items-center gap-1">
            <Car className="h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
            {property.parkingSpots ?? 2} vagas
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <motion.button
            type="button"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            onClick={() => onScheduleClick?.(property)}
            className="relative inline-flex flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            {!shouldReduceMotion && (
              <span className="animate-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            )}
            <CalendarCheck className="relative z-10 h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="relative z-10">Agendar visita</span>
          </motion.button>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onDetailsClick?.(property)}
            className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-ink-900 px-2.5 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-gold-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <span>Ver detalhes</span>
            <ExternalLink className="h-3 w-3 text-gold-400" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
