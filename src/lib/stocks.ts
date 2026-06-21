import { env } from "@/env";

export interface Stock {
  symbol: string;
  name: string;
  /** Domain used to fetch a logo.dev logo (https://img.logo.dev/{domain}). */
  domain: string;
}

/**
 * The 15 tickers shown on the homepage. IBM is included intentionally — it's
 * AlphaVantage's documented sample symbol, so it returns live data even on a
 * fresh free-tier key.
 */
export const STOCKS: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", domain: "apple.com" },
  { symbol: "MSFT", name: "Microsoft Corporation", domain: "microsoft.com" },
  { symbol: "GOOGL", name: "Alphabet Inc.", domain: "google.com" },
  { symbol: "AMZN", name: "Amazon.com, Inc.", domain: "amazon.com" },
  { symbol: "NVDA", name: "NVIDIA Corporation", domain: "nvidia.com" },
  { symbol: "META", name: "Meta Platforms, Inc.", domain: "meta.com" },
  { symbol: "TSLA", name: "Tesla, Inc.", domain: "tesla.com" },
  { symbol: "NFLX", name: "Netflix, Inc.", domain: "netflix.com" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", domain: "jpmorganchase.com" },
  { symbol: "V", name: "Visa Inc.", domain: "visa.com" },
  { symbol: "WMT", name: "Walmart Inc.", domain: "walmart.com" },
  { symbol: "DIS", name: "The Walt Disney Company", domain: "disney.com" },
  { symbol: "KO", name: "The Coca-Cola Company", domain: "coca-cola.com" },
  { symbol: "INTC", name: "Intel Corporation", domain: "intel.com" },
  { symbol: "IBM", name: "International Business Machines", domain: "ibm.com" },
];

/** Look up a stock by symbol (case-insensitive). Returns undefined if unknown. */
export function findStock(symbol: string): Stock | undefined {
  const normalized = symbol.toUpperCase();
  return STOCKS.find((stock) => stock.symbol === normalized);
}

/**
 * Build the logo.dev logo URL for a company domain. logo.dev requires a token
 * (a publishable pk_… key, safe to expose to the browser); without one the
 * request fails and CompanyLogo falls back to ticker initials.
 */
export function logoUrl(domain: string): string {
  const token = env.NEXT_PUBLIC_LOGODEV_PUBLISHABLE_KEY;
  const url = new URL(`https://img.logo.dev/${domain}`);
  if (token) url.searchParams.set("token", token);
  return url.toString();
}
