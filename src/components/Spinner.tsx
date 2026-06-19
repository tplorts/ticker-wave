/** A dual-ring spinner using the accent color. */
export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-block animate-spin rounded-full border-2 border-edge border-t-accent"
      style={{ width: size, height: size }}
    />
  );
}
