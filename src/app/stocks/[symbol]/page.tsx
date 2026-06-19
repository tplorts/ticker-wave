import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findStock } from "@/lib/stocks";
import { getCompanyOverview, getDailyPrices } from "@/lib/alphavantage";
import { CompanyLogo } from "@/components/CompanyLogo";
import { CompanyOverview } from "@/components/CompanyOverview";
import { PriceChart } from "@/components/PriceChart";
import { PriceHistoryTable } from "@/components/PriceHistoryTable";

interface PageProps {
  // Next.js 16: route params are async.
  params: Promise<{ symbol: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { symbol } = await params;
  const stock = findStock(symbol);
  if (!stock) return { title: "Stock not found · Ticker Wave" };
  return {
    title: `${stock.symbol} — ${stock.name} · Ticker Wave`,
    description: `Company overview and recent price history for ${stock.name} (${stock.symbol}).`,
  };
}

export default async function StockDetailsPage({ params }: PageProps) {
  const { symbol } = await params;
  const stock = findStock(symbol);
  if (!stock) notFound();

  // Fetch both endpoints in parallel; each resolves to null on failure so a
  // single rate-limited call never takes down the whole page.
  const [overviewResult, pricesResult] = await Promise.allSettled([
    getCompanyOverview(stock.symbol),
    getDailyPrices(stock.symbol),
  ]);
  const overview =
    overviewResult.status === "fulfilled" ? overviewResult.value : null;
  const prices =
    pricesResult.status === "fulfilled" ? pricesResult.value : null;

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span> All stocks
      </Link>

      <header className="flex items-center gap-4">
        <CompanyLogo symbol={stock.symbol} domain={stock.domain} size={64} />
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
            {stock.symbol}
          </h1>
          <p className="truncate text-muted">{overview?.Name ?? stock.name}</p>
        </div>
      </header>

      <CompanyOverview
        overview={overview}
        fallbackSymbol={stock.symbol}
        fallbackName={stock.name}
      />

      {prices && prices.length > 0 ? (
        <>
          <PriceChart points={prices} />
          <PriceHistoryTable points={prices} />
        </>
      ) : (
        <section className="rounded-2xl border border-edge bg-card p-6 text-center shadow-sm">
          <p className="text-sm text-muted">
            Price history is currently unavailable. The AlphaVantage free tier
            allows roughly 25 requests per day — please try again later.
          </p>
        </section>
      )}
    </div>
  );
}
