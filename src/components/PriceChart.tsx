"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PricePoint } from "@/types/alphavantage";
import { formatDate, formatPrice } from "@/lib/format";

interface PriceChartProps {
  points: PricePoint[];
}

interface ChartDatum {
  date: string;
  close: number;
}

interface TooltipPayloadItem {
  payload?: ChartDatum;
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}) {
  if (!active || !payload?.length || !payload[0].payload) return null;
  const { date, close } = payload[0].payload;
  return (
    <div className="rounded-lg border border-edge bg-card px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-muted">{formatDate(date)}</p>
      <p className="text-sm font-semibold">{formatPrice(close)}</p>
    </div>
  );
}

function shortDate(iso: string): string {
  // YYYY-MM-DD -> M/D
  const [, month, day] = iso.split("-");
  return `${Number(month)}/${Number(day)}`;
}

export function PriceChart({ points }: PriceChartProps) {
  // API gives newest-first; chart reads left→right oldest→newest.
  const data: ChartDatum[] = [...points]
    .reverse()
    .map(({ date, close }) => ({ date, close }));

  const closes = data.map((d) => d.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const pad = (max - min) * 0.08 || 1;

  return (
    <section className="space-y-4 rounded-2xl border border-edge bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-tight">
          Closing price
        </h2>
        <span className="text-xs text-muted">Last {data.length} sessions</span>
      </div>

      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-accent)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-accent)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-edge)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={shortDate}
              minTickGap={32}
              tick={{ fill: "var(--color-muted)", fontSize: 11 }}
              axisLine={{ stroke: "var(--color-edge)" }}
              tickLine={false}
            />
            <YAxis
              domain={[min - pad, max + pad]}
              tickFormatter={(v: number) => `$${v.toFixed(0)}`}
              width={52}
              tick={{ fill: "var(--color-muted)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="close"
              stroke="var(--color-accent)"
              strokeWidth={2}
              fill="url(#priceFill)"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
