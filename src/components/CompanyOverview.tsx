import type { CompanyOverview as Overview } from "@/types/alphavantage";
import { formatMarketCap, naOrValue, NA } from "@/lib/format";
import { SectionCard } from "./SectionCard";

interface CompanyOverviewProps {
  overview: Overview | null;
  /** Fallbacks from our static catalog when the API doesn't return them. */
  fallbackSymbol: string;
  fallbackName: string;
}

function Field({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  /** Render the value as flowing prose (e.g. a description) rather than a
   *  single emphasized line. */
  multiline?: boolean;
}) {
  const valueClass =
    value === NA
      ? "text-sm text-muted/70"
      : multiline
        ? "text-sm leading-relaxed text-foreground/90"
        : "text-sm font-medium";
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className={valueClass}>{value}</dd>
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
    <SectionCard title="Company overview">
      {!overview && (
        <p className="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning-fg">
          Company overview is currently unavailable (the AlphaVantage free tier
          allows ~25 requests/day). Showing N/A where data is missing.
        </p>
      )}

      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        <Field
          label="Symbol"
          value={naOrValue(overview?.Symbol ?? fallbackSymbol)}
        />
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

      <dl>
        <Field label="Description" value={description} multiline />
      </dl>
    </SectionCard>
  );
}
