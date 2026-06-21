import { z } from "zod";

/**
 * Type-guarded environment variables. Import as `import { env } from "@/env"`.
 *
 * Server and client vars are validated separately because of two Next.js
 * constraints:
 *   1. Server-only vars are `undefined` in the browser, so we only validate
 *      them when running on the server (`typeof window === "undefined"`).
 *   2. Next inlines `NEXT_PUBLIC_*` vars only when referenced statically, so
 *      each one must be read explicitly (no spreading `process.env`).
 */

const serverSchema = z.object({
  // Falls back to AlphaVantage's public "demo" key (works for IBM) if unset.
  ALPHAVANTAGE_API_KEY: z.string().min(1).default("demo"),
});

const clientSchema = z.object({
  // Optional publishable key (pk_…); empty means "no token", and CompanyLogo
  // degrades to ticker initials.
  LOGODEV_PUBLISHABLE_KEY: z.string().default(""),
});

const serverEnv =
  typeof window === "undefined"
    ? serverSchema.parse(process.env)
    : ({} as z.infer<typeof serverSchema>);

const clientEnv = clientSchema.parse({
  LOGODEV_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_LOGODEV_PUBLISHABLE_KEY,
});

export const env = { ...serverEnv, ...clientEnv };
