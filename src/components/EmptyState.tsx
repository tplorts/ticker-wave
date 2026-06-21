import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionCard } from "./SectionCard";

interface EmptyStateProps {
  /** Optional heading rendered by the underlying SectionCard. */
  title?: string;
  className?: string;
  children: ReactNode;
}

/**
 * A SectionCard whose body is centered, muted explanatory copy — used when an
 * API-backed section has no data to show. Keeps the card chrome identical to the
 * populated sections instead of hand-rolling it per call site.
 */
export function EmptyState({ title, className, children }: EmptyStateProps) {
  return (
    <SectionCard title={title} className={cn("text-center", className)}>
      <p className="text-sm text-muted">{children}</p>
    </SectionCard>
  );
}
