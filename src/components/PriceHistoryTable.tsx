import type { PricePoint } from "@/types/alphavantage";
import {
  formatDate,
  formatPct,
  formatPrice,
  formatVolume,
  pctChange,
} from "@/lib/format";

export function PriceHistoryTable({ points }: { points: PricePoint[] }) {
  return (
    <section className="space-y-4 rounded-2xl border border-edge bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Price history</h2>
        <span className="text-xs text-muted">{points.length} trading days</span>
      </div>

      <div className="max-h-[28rem] overflow-auto rounded-lg border border-edge">
        <table className="w-full min-w-[34rem] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-card text-muted">
            <tr className="border-b border-edge text-left">
              <th scope="col" className="px-4 py-2.5 font-medium">Date</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Close</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Volume</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">% Change</th>
            </tr>
          </thead>
          <tbody>
            {points.map((point, i) => {
              // Data is newest-first, so the previous trading day is the next row.
              const previous = points[i + 1];
              const change = pctChange(point.close, previous?.close);
              const changeClass =
                change === null
                  ? "text-muted"
                  : change > 0
                    ? "text-up"
                    : change < 0
                      ? "text-down"
                      : "text-muted";
              const arrow = change === null ? "" : change > 0 ? "▲ " : change < 0 ? "▼ " : "";

              return (
                <tr
                  key={point.date}
                  className="border-b border-edge/60 last:border-0 odd:bg-foreground/[0.015]"
                >
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    {formatDate(point.date)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium tabular-nums">
                    {formatPrice(point.close)}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-muted">
                    {formatVolume(point.volume)}
                  </td>
                  <td
                    className={`px-4 py-2.5 text-right font-medium tabular-nums ${changeClass}`}
                  >
                    {arrow}
                    {formatPct(change)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
