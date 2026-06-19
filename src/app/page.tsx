import { STOCKS } from "@/lib/stocks";
import { StockTile } from "@/components/StockTile";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Explore the market
        </h1>
        <p className="max-w-2xl text-muted">
          A curated set of {STOCKS.length} tickers. Select any company to see its
          overview, recent price history, and a chart of closing prices.
        </p>
      </section>

      <section
        aria-label="Stocks"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
      >
        {STOCKS.map((stock) => (
          <StockTile key={stock.symbol} stock={stock} />
        ))}
      </section>
    </div>
  );
}
