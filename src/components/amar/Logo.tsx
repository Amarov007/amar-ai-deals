export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand shadow-[0_0_28px_-6px_oklch(0.65_0.21_296/0.8)]">
        <span className="absolute inset-[1.5px] rounded-[10px] bg-[oklch(0.14_0.025_265)]" />
        <svg viewBox="0 0 24 24" className="relative h-5 w-5" aria-hidden="true">
          <defs>
            <linearGradient id="amarCore" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="45%" stopColor="#2563EB" />
              <stop offset="75%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path
            d="M12 2.5c1.2 3.6 2.9 5.3 6.5 6.5-3.6 1.2-5.3 2.9-6.5 6.5-1.2-3.6-2.9-5.3-6.5-6.5C9.1 7.8 10.8 6.1 12 2.5Z"
            fill="url(#amarCore)"
          />
          <circle cx="17.5" cy="17.5" r="3" fill="url(#amarCore)" opacity="0.85" />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={`block font-display font-bold tracking-tight text-brand ${
            size === "sm" ? "text-lg" : "text-xl sm:text-[1.4rem]"
          }`}
        >
          AMAR007AI
        </span>
      </span>
    </span>
  );
}