import type { CompanyOverview as Overview } from "@/types/alphavantage";
import { formatMarketCap, naOrValue } from "@/lib/format";

interface CompanyOverviewProps {
  overview: Overview | null;
  /** Fallbacks from our static catalog when the API doesn't return them. */
  fallbackSymbol: string;
  fallbackName: string;
}

function Field({ label, value }: { label: string; value: string }) {
  const isNA = value === "N/A";
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className={isNA ? "text-sm text-muted/70" : "text-sm font-medium"}>
        {value}
      </dd>
    </div>
  );
}

export function CompanyOverview({
  overview,
  fallbackSymbol,
  fallbackName,
}: CompanyOverviewProps) {
  const description = naOrValue(overview?.Description);

  return (
    <section className="space-y-4 rounded-2xl border border-edge bg-card p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold tracking-tight">Company overview</h2>

      {!overview && (
        <p className="rounded-lg border border-amber-300/40 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300">
          Company overview is currently unavailable (the AlphaVantage free tier
          allows ~25 requests/day). Showing N/A where data is missing.
        </p>
      )}

      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        <Field label="Symbol" value={naOrValue(overview?.Symbol ?? fallbackSymbol)} />
        <Field label="Asset Type" value={naOrValue(overview?.AssetType)} />
        <Field label="Name" value={naOrValue(overview?.Name ?? fallbackName)} />
        <Field label="Exchange" value={naOrValue(overview?.Exchange)} />
        <Field label="Sector" value={naOrValue(overview?.Sector)} />
        <Field label="Industry" value={naOrValue(overview?.Industry)} />
        <Field
          label="Market Cap"
          value={formatMarketCap(overview?.MarketCapitalization)}
        />
      </dl>

      <div className="space-y-1">
        <dt className="text-xs font-medium uppercase tracking-wide text-muted">
          Description
        </dt>
        <dd
          className={
            description === "N/A"
              ? "text-sm text-muted/70"
              : "text-sm leading-relaxed text-foreground/90"
          }
        >
          {description}
        </dd>
      </div>
    </section>
  );
}
