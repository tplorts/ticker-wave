import Link from "next/link";
import type { Stock } from "@/lib/stocks";
import { CompanyLogo } from "./CompanyLogo";

/**
 * Homepage tile linking to a stock's details page. Purely static — renders no
 * API data, so the homepage never spends AlphaVantage quota.
 */
export function StockTile({ stock }: { stock: Stock }) {
  return (
    <Link
      href={`/stocks/${stock.symbol}`}
      className="group flex flex-col gap-3 rounded-2xl border border-edge bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-5"
    >
      <div className="flex items-center justify-between">
        <CompanyLogo symbol={stock.symbol} domain={stock.domain} size={44} />
        <span className="text-base font-bold tracking-tight">
          {stock.symbol}
        </span>
      </div>
      <p className="line-clamp-2 text-sm text-muted" title={stock.name}>
        {stock.name}
      </p>
      <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
        View details
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}
