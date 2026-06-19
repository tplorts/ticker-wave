/** A shimmering placeholder block. Compose these to build loading skeletons. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-md ${className}`} />;
}
