import { afterEach, describe, expect, it, vi } from "vitest";
import { STOCKS, findStock, logoUrl } from "./stocks";

describe("findStock", () => {
  it("finds a stock by its exact symbol", () => {
    expect(findStock("AAPL")).toEqual({
      symbol: "AAPL",
      name: "Apple Inc.",
      domain: "apple.com",
    });
  });

  it("is case-insensitive", () => {
    expect(findStock("aapl")?.symbol).toBe("AAPL");
    expect(findStock("MsFt")?.symbol).toBe("MSFT");
  });

  it("returns undefined for an unknown symbol", () => {
    expect(findStock("NOPE")).toBeUndefined();
    expect(findStock("")).toBeUndefined();
  });
});

describe("STOCKS", () => {
  it("has unique symbols", () => {
    const symbols = STOCKS.map((s) => s.symbol);
    expect(new Set(symbols).size).toBe(symbols.length);
  });

  it("has non-empty symbol, name, and domain for every entry", () => {
    for (const stock of STOCKS) {
      expect(stock.symbol).not.toBe("");
      expect(stock.name).not.toBe("");
      expect(stock.domain).not.toBe("");
    }
  });
});

describe("logoUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("builds the logo.dev URL without a token when none is configured", () => {
    // No NEXT_PUBLIC_LOGODEV_PUBLISHABLE_KEY in the test env.
    expect(logoUrl("apple.com")).toBe("https://img.logo.dev/apple.com");
  });

  it("appends the token query param when one is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_LOGODEV_PUBLISHABLE_KEY", "pk_test123");
    vi.resetModules();
    // Re-import so the module re-reads the env var at load time.
    const { logoUrl: freshLogoUrl } = await import("./stocks");
    expect(freshLogoUrl("apple.com")).toBe(
      "https://img.logo.dev/apple.com?token=pk_test123",
    );
  });
});
