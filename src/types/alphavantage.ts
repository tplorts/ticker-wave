/**
 * Shape of the AlphaVantage `OVERVIEW` response. All values arrive as strings;
 * missing fields come back as "None", "-", or absent entirely. We only type the
 * fields the UI consumes (plus a permissive index signature for the rest).
 */
export interface CompanyOverview {
  Symbol: string;
  AssetType?: string;
  Name?: string;
  Description?: string;
  Exchange?: string;
  Sector?: string;
  Industry?: string;
  MarketCapitalization?: string;
  [key: string]: string | undefined;
}

/** A single day's OHLCV entry from `TIME_SERIES_DAILY`. */
export interface DailyQuote {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

/** Raw `TIME_SERIES_DAILY` response. */
export interface DailyTimeSeriesResponse {
  "Meta Data"?: Record<string, string>;
  "Time Series (Daily)"?: Record<string, DailyQuote>;
}

/** Normalized, numeric price point used throughout the UI (newest-first order). */
export interface PricePoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
