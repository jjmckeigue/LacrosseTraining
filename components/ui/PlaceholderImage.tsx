type PlaceholderImageProps = {
  label: string;
  spec?: string;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Stand-in for real photography while assets are being sourced.
 * Replace with next/image once the corresponding file exists in /public/images.
 */
export default function PlaceholderImage({
  label,
  spec,
  tone = "light",
  className = "",
}: PlaceholderImageProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border ${
        isDark
          ? "border-line-invert bg-ink-2"
          : "border-line bg-paper-2"
      } ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(135deg, ${
          isDark ? "rgb(248 244 236 / 5%)" : "rgb(11 18 32 / 5%)"
        } 0px, transparent 1px, transparent 10px, ${
          isDark ? "rgb(248 244 236 / 5%)" : "rgb(11 18 32 / 5%)"
        } 11px)`,
      }}
    >
      <div className="px-6 text-center">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.15em] ${
            isDark ? "text-paper/60" : "text-ink/45"
          }`}
        >
          Photo needed
        </p>
        <p
          className={`mt-2 max-w-[26ch] text-sm ${
            isDark ? "text-paper/80" : "text-ink/70"
          }`}
        >
          {label}
        </p>
        {spec && (
          <p
            className={`mt-1 text-xs ${
              isDark ? "text-paper/40" : "text-ink/35"
            }`}
          >
            {spec}
          </p>
        )}
      </div>
    </div>
  );
}
