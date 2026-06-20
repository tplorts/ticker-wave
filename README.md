# Ticker Wave

A small Next.js app for browsing a curated set of stock tickers. The homepage
lists the companies; selecting one shows its overview, recent daily price
history, and a chart of closing prices. Market data comes from
[AlphaVantage](https://www.alphavantage.co) and logos from
[logo.dev](https://logo.dev).

## Getting Started

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Both keys are optional — the app degrades gracefully without them:

- `ALPHAVANTAGE_API_KEY` — falls back to the public `demo` key (IBM only).
- `NEXT_PUBLIC_LOGODEV_PUBLISHABLE_KEY` — without it, logos fall back to ticker
  initials.
