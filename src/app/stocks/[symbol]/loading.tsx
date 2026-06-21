import { SectionCard } from "@/components/SectionCard";
import { Skeleton } from "@/components/Skeleton";
import { Spinner } from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-24" />

      <HeaderLoading />

      <OverviewCardLoading />

      <ChartCardLoading />
    </div>
  );
}

function HeaderLoading() {
  return (
    <header className="flex items-center gap-4">
      <Skeleton className="h-16 w-16 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-4 w-44" />
      </div>
    </header>
  );
}

function OverviewCardLoading() {
  return (
    <SectionCard>
      <Skeleton className="h-5 w-40" />
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>
      <Skeleton className="h-3 w-24" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </SectionCard>
  );
}

function ChartCardLoading() {
  return (
    <SectionCard>
      <Skeleton className="h-5 w-36" />
      <div className="flex h-64 w-full items-center justify-center sm:h-72">
        <div className="flex flex-col items-center gap-3 text-muted">
          <Spinner size={32} />
          <span className="text-xs font-medium">Loading price data…</span>
        </div>
      </div>
    </SectionCard>
  );
}
