import type { PricePoint } from "@/types/alphavantage";
import { formatDate, formatPrice, formatVolume, pctChange } from "@/lib/format";
import { PercentChange } from "./PercentChange";
import { SectionCard } from "./SectionCard";

export function PriceHistoryTable({ points }: { points: PricePoint[] }) {
  return (
    <SectionCard title="Price history" meta={`${points.length} trading days`}>
      <div className="max-h-price-table-viewport overflow-auto rounded-lg border border-edge">
        <table className="w-full min-w-price-table-min border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-card text-muted">
            <tr className="border-b border-edge text-left">
              <th scope="col" className="px-4 py-2.5 font-medium">
                Date
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">
                Close
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">
                Volume
              </th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">
                % Change
              </th>
            </tr>
          </thead>
          <tbody>
            {points.map((point, i) => {
              // Data is newest-first, so the previous trading day is the next row.
              const previous = points[i + 1];
              const change = pctChange(point.close, previous?.close);

              return (
                <tr
                  key={point.date}
                  className="border-b border-edge/60 last:border-0 odd:bg-row-stripe"
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
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    <PercentChange value={change} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
