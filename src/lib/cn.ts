import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names: drops falsy values (so `cn("base", maybeUndefined)` never
 * emits a literal "undefined"), and resolves conflicting Tailwind utilities so a
 * caller's class wins over the base (e.g. `cn("rounded-2xl", "rounded-none")`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
