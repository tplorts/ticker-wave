import { cache } from "react";
import { env } from "@/env";
import type {
  CompanyOverview,
  DailyTimeSeriesResponse,
  PricePoint,
} from "@/types/alphavantage";

const BASE_URL = "https://www.alphavantage.co/query";

/** Cache AlphaVantage responses for a day to protect the ~25 req/day free tier. */
const REVALIDATE_SECONDS = 86_400;

function buildUrl(params: Record<string, string>): string {
  const search = new URLSearchParams({
    ...params,
    apikey: env.ALPHAVANTAGE_API_KEY,
  });
  return `${BASE_URL}?${search.toString()}`;
}

/**
 * AlphaVantage returns HTTP 200 with a `Note`/`Information`/`Error Message`
 * payload (instead of data) when the key is throttled or the request is bad.
 * Detect that so callers can degrade gracefully.
 */
function isUnavailable(json: unknown): boolean {
  if (!json || typeof json !== "object") return true;
  const obj = json as Record<string, unknown>;
  return "Note" in obj || "Information" in obj || "Error Message" in obj;
}

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Fetch a company's overview. Returns null when the data is unavailable
 * (rate-limited, unknown symbol, or network error) so pages can render N/A.
 * Wrapped in React.cache to dedupe within a single request.
 */
export const getCompanyOverview = cache(
  async (symbol: string): Promise<CompanyOverview | null> => {
    const json = await fetchJson(buildUrl({ function: "OVERVIEW", symbol }));
    if (isUnavailable(json)) return null;
    // A valid overview always carries a Symbol; an empty {} means "not found".
    if (typeof json !== "object" || json === null || !("Symbol" in json)) {
      return null;
    }
    return json as CompanyOverview;
  },
);

/**
 * Fetch ~100 most-recent daily prices, normalized to numeric `PricePoint`s in
 * newest-first order. Returns null when unavailable.
 */
export const getDailyPrices = cache(
  async (symbol: string): Promise<PricePoint[] | null> => {
    const json = await fetchJson(
      buildUrl({
        function: "TIME_SERIES_DAILY",
        symbol,
        outputsize: "compact",
      }),
    );
    if (isUnavailable(json)) return null;

    const series = (json as DailyTimeSeriesResponse)?.["Time Series (Daily)"];
    if (!series || typeof series !== "object") return null;

    const points: PricePoint[] = Object.entries(series).map(
      ([date, quote]) => ({
        date,
        open: Number(quote["1. open"]),
        high: Number(quote["2. high"]),
        low: Number(quote["3. low"]),
        close: Number(quote["4. close"]),
        volume: Number(quote["5. volume"]),
      }),
    );

    if (points.length === 0) return null;

    // Newest day first.
    points.sort((a, b) => (a.date < b.date ? 1 : -1));
    return points;
  },
);
