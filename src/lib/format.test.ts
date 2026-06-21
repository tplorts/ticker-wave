import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatMarketCap,
  formatPct,
  formatPrice,
  formatShortDate,
  formatVolume,
  naOrValue,
  pctChange,
} from "./format";

describe("naOrValue", () => {
  it("returns N/A for null and undefined", () => {
    expect(naOrValue(null)).toBe("N/A");
    expect(naOrValue(undefined)).toBe("N/A");
  });

  it("returns N/A for empty/whitespace strings", () => {
    expect(naOrValue("")).toBe("N/A");
    expect(naOrValue("   ")).toBe("N/A");
  });

  it.each(["none", "None", "NONE", "-", "n/a", "N/A", "null", "undefined"])(
    "treats placeholder %j as N/A (case-insensitive)",
    (placeholder) => {
      expect(naOrValue(placeholder)).toBe("N/A");
    },
  );

  it("trims surrounding whitespace from real values", () => {
    expect(naOrValue("  Technology  ")).toBe("Technology");
  });

  it("returns the value for real strings and numbers", () => {
    expect(naOrValue("Apple Inc.")).toBe("Apple Inc.");
    expect(naOrValue(42)).toBe("42");
    expect(naOrValue(0)).toBe("0");
  });
});

describe("formatMarketCap", () => {
  it("returns N/A for missing or non-numeric input", () => {
    expect(formatMarketCap(null)).toBe("N/A");
    expect(formatMarketCap(undefined)).toBe("N/A");
    expect(formatMarketCap("")).toBe("N/A");
    expect(formatMarketCap("abc")).toBe("N/A");
  });

  it("returns N/A for zero and negative values", () => {
    expect(formatMarketCap(0)).toBe("N/A");
    expect(formatMarketCap(-5)).toBe("N/A");
  });

  it("formats trillions, billions, millions, and thousands", () => {
    expect(formatMarketCap("3010000000000")).toBe("$3.01T");
    expect(formatMarketCap(2_500_000_000)).toBe("$2.50B");
    expect(formatMarketCap(7_250_000)).toBe("$7.25M");
    expect(formatMarketCap(1_500)).toBe("$1.50K");
  });

  it("formats sub-thousand values with no suffix and no decimals", () => {
    expect(formatMarketCap(999)).toBe("$999");
    expect(formatMarketCap(1)).toBe("$1");
  });

  it("uses each unit at its exact threshold", () => {
    expect(formatMarketCap(1e12)).toBe("$1.00T");
    expect(formatMarketCap(1e9)).toBe("$1.00B");
    expect(formatMarketCap(1e6)).toBe("$1.00M");
    expect(formatMarketCap(1e3)).toBe("$1.00K");
  });

  it("accepts numeric strings with surrounding whitespace", () => {
    expect(formatMarketCap("  1000000  ")).toBe("$1.00M");
  });
});

describe("formatVolume", () => {
  it("returns N/A for missing or non-finite input", () => {
    expect(formatVolume(null)).toBe("N/A");
    expect(formatVolume(undefined)).toBe("N/A");
    expect(formatVolume(NaN)).toBe("N/A");
    expect(formatVolume(Infinity)).toBe("N/A");
  });

  it("formats with thousands separators", () => {
    expect(formatVolume(1234567)).toBe("1,234,567");
    expect(formatVolume(0)).toBe("0");
    expect(formatVolume(999)).toBe("999");
  });
});

describe("formatPrice", () => {
  it("returns N/A for missing or non-finite input", () => {
    expect(formatPrice(null)).toBe("N/A");
    expect(formatPrice(undefined)).toBe("N/A");
    expect(formatPrice(NaN)).toBe("N/A");
  });

  it("formats values as USD currency", () => {
    expect(formatPrice(123.45)).toBe("$123.45");
    expect(formatPrice(0)).toBe("$0.00");
    expect(formatPrice(1000)).toBe("$1,000.00");
  });

  it("rounds to two decimal places", () => {
    expect(formatPrice(1.005)).toBe("$1.01");
  });
});

describe("pctChange", () => {
  it("returns null when either value is missing or non-finite", () => {
    expect(pctChange(null, 100)).toBeNull();
    expect(pctChange(100, null)).toBeNull();
    expect(pctChange(undefined, 100)).toBeNull();
    expect(pctChange(NaN, 100)).toBeNull();
    expect(pctChange(100, Infinity)).toBeNull();
  });

  it("returns null when the baseline is zero", () => {
    expect(pctChange(50, 0)).toBeNull();
  });

  it("computes positive and negative percentage changes", () => {
    expect(pctChange(110, 100)).toBe(10);
    expect(pctChange(90, 100)).toBe(-10);
    expect(pctChange(100, 100)).toBe(0);
  });

  it("handles a negative baseline", () => {
    expect(pctChange(-50, -100)).toBe(-50);
  });
});

describe("formatPct", () => {
  it("returns an em dash for null", () => {
    expect(formatPct(null)).toBe("—");
  });

  it("prefixes positive values with a plus sign", () => {
    expect(formatPct(1.234)).toBe("+1.23%");
  });

  it("keeps the minus sign on negative values", () => {
    expect(formatPct(-1.234)).toBe("-1.23%");
  });

  it("formats zero without a sign", () => {
    expect(formatPct(0)).toBe("0.00%");
  });
});

describe("formatDate", () => {
  it("formats an ISO date as a US short date", () => {
    expect(formatDate("2026-06-19")).toBe("Jun 19, 2026");
    expect(formatDate("2026-01-01")).toBe("Jan 1, 2026");
  });

  it("returns the original string when it is not a valid date", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
    expect(formatDate("")).toBe("");
  });
});

describe("formatShortDate", () => {
  it("formats an ISO date as M/D without leading zeros", () => {
    expect(formatShortDate("2026-06-09")).toBe("6/9");
    expect(formatShortDate("2026-01-01")).toBe("1/1");
    expect(formatShortDate("2026-12-25")).toBe("12/25");
  });
});
