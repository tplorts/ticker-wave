/** Sentinel the formatters return when a value is missing or unusable. */
export const NA = "N/A";

/** Values AlphaVantage uses to signal "no data" for a field. */
const EMPTY_VALUES = new Set(["", "none", "-", "n/a", "null", "undefined"]);

/**
 * Returns the trimmed value, or "N/A" when it's missing or one of AlphaVantage's
 * placeholder empties.
 */
export function naOrValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return NA;
  const str = String(value).trim();
  if (str === "" || EMPTY_VALUES.has(str.toLowerCase())) return NA;
  return str;
}

/**
 * Formats a raw market-cap string (e.g. "3010000000000") into a human-readable
 * value like "$3.01T". Returns "N/A" when the input isn't a usable number.
 */
export function formatMarketCap(
  value: string | number | null | undefined,
): string {
  if (value === null || value === undefined) return NA;
  const num = typeof value === "number" ? value : Number(String(value).trim());
  if (!Number.isFinite(num) || num <= 0) return NA;

  // Compacted values (≥ $1K) carry two decimals (e.g. "$2.50B"); sub-thousand
  // values render as whole dollars (e.g. "$999").
  const fractionDigits = num < 1e3 ? 0 : 2;
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(num);
}

/** Formats a share-volume number with thousands separators (e.g. 1,234,567). */
export function formatVolume(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value))
    return NA;
  return value.toLocaleString("en-US");
}

/** Formats a close price as USD currency (e.g. $123.45). */
export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value))
    return NA;
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

/**
 * Percentage change from `previous` to `current`. Returns null when it can't be
 * computed (missing previous day, or a zero/invalid baseline).
 */
export function pctChange(
  current: number | null | undefined,
  previous: number | null | undefined,
): number | null {
  if (
    current === null ||
    current === undefined ||
    previous === null ||
    previous === undefined ||
    !Number.isFinite(current) ||
    !Number.isFinite(previous) ||
    previous === 0
  ) {
    return null;
  }
  return ((current - previous) / previous) * 100;
}

/** Formats a percentage with a sign and two decimals (e.g. "+1.23%"). */
export function formatPct(value: number | null): string {
  if (value === null) return "—";
  // `value` is already in percent units, so scale back to a ratio for `style: "percent"`.
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    signDisplay: "exceptZero",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

/** Formats an ISO date (YYYY-MM-DD) as e.g. "Jun 19, 2026". */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Formats an ISO date (YYYY-MM-DD) compactly as "M/D" with no leading zeros
 * (e.g. "6/9"). Used for dense axis ticks. Splits the string directly to stay
 * timezone-agnostic.
 */
export function formatShortDate(iso: string): string {
  const [, month, day] = iso.split("-");
  return `${Number(month)}/${Number(day)}`;
}
