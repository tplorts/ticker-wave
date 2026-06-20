"use client";

import Image from "next/image";
import { useState } from "react";
import { logoUrl } from "@/lib/stocks";

interface CompanyLogoProps {
  symbol: string;
  domain: string;
  size?: number;
  className?: string;
}

/**
 * Renders a company's logo.dev logo, falling back to its ticker initials in a
 * tinted tile when the image is missing or fails to load.
 */
export function CompanyLogo({
  symbol,
  domain,
  size = 48,
  className = "",
}: CompanyLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-accent/10 font-semibold text-accent ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.34 }}
        aria-label={`${symbol} logo`}
      >
        {symbol.slice(0, 4)}
      </div>
    );
  }

  return (
    <Image
      src={logoUrl(domain)}
      alt={`${symbol} logo`}
      width={size}
      height={size}
      className={`rounded-xl bg-white object-contain ring-1 ring-edge ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
