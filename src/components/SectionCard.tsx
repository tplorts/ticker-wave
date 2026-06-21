import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionCardProps {
  /** Optional heading rendered as an <h2> at the top of the card. */
  title?: string;
  /** Optional right-aligned meta content shown beside the title. */
  meta?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Card container shared by the stock-detail sections (and their loading
 * skeletons) so the chrome stays identical across them.
 */
export function SectionCard({
  title,
  meta,
  className = "",
  children,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "space-y-4 rounded-2xl border border-edge bg-card p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      {title && (
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {meta != null && <span className="text-xs text-muted">{meta}</span>}
        </div>
      )}
      {children}
    </section>
  );
}
