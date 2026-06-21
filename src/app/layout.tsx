import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthorAttribution } from "@/components/AuthorAttribution";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ticker Wave — Stock Explorer",
  description:
    "Browse a curated set of stocks and dive into company overviews and price history, powered by AlphaVantage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <header className="sticky top-0 z-10 border-b border-edge bg-card/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-base font-bold text-accent-fg shadow-sm transition-transform group-hover:scale-105">
                ~
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Ticker<span className="text-accent">Wave</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>

        <footer className="border-t border-edge">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center text-xs text-muted sm:px-6">
            <p>
              Ticker Wave · Powered by AlphaVantage · Data delayed and cached
              daily · For demonstration only, not financial advice.
            </p>
            <AuthorAttribution />
          </div>
        </footer>
      </body>
    </html>
  );
}
