import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-5xl font-bold tracking-tight">404</p>
      <h1 className="text-xl font-semibold">Unknown ticker</h1>
      <p className="max-w-sm text-sm text-muted">
        That symbol isn&apos;t in our catalog. Head back to the homepage to
        browse the available stocks.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
      >
        Back to all stocks
      </Link>
    </div>
  );
}
