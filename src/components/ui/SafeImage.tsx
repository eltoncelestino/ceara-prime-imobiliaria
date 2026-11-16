"use client";

import { useState } from "react";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/data/mockData";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes: string;
  className?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  className = "",
  priority = false,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        aria-label={alt}
        className={`bg-gradient-to-br from-ink-800 via-ink-700 to-ink-900 ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
