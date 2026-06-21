interface LogoProps {
  className?: string;
  title?: string;
}

/**
 * Ticker Wave brand mark: an emerald chip carrying a white sine waveform (the
 * "wave") with a terracotta marker riding a crest (the "ticker"). Colors are
 * intentionally fixed rather than themed so the mark reads consistently on
 * light and dark backgrounds, mirroring the --accent / --accent-2 palette.
 */
export function Logo({ className, title = "Ticker Wave" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="tw-logo-bg"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#tw-logo-bg)" />
      <path
        d="M7 24 C10.1 14.67 12.4 14.67 15.5 24 C18.6 33.33 20.9 33.33 24 24 C27.1 14.67 29.4 14.67 32.5 24 C35.6 33.33 38.4 33.33 41 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="28.25"
        cy="17"
        r="3"
        fill="#c2643f"
        stroke="#ffffff"
        strokeWidth="1.5"
      />
    </svg>
  );
}
