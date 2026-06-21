import { formatPct } from "@/lib/format";

/**
 * Renders a percentage change with a directional arrow and up/down/neutral
 * coloring. `value` is the already-computed percentage (see pctChange), or
 * null when it can't be determined.
 */
export function PercentChange({ value }: { value: number | null }) {
  const direction = value === null ? 0 : Math.sign(value);
  const colorClass =
    direction > 0 ? "text-up" : direction < 0 ? "text-down" : "text-muted";
  const arrow = direction > 0 ? "▲ " : direction < 0 ? "▼ " : "";

  return (
    <span className={`font-medium ${colorClass}`}>
      {arrow}
      {formatPct(value)}
    </span>
  );
}
