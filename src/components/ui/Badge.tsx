import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { StarIcon } from "./Icons";

type BadgeVariant = "neutral" | "brand" | "success" | "info" | "danger";

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  neutral: "bg-elevated text-default",
  brand: "bg-brand/15 text-brand",
  success: "bg-accent-600/15 text-accent-700 dark:text-accent-400",
  info: "bg-sky-600/15 text-sky-700 dark:text-sky-400",
  danger: "bg-danger-600/15 text-danger-600 dark:text-danger-300",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold",
        BADGE_VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-input px-2.5 py-1 text-[11px] text-default",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Rating({ value, reviews, className }: { value: number; reviews?: number; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1 text-xs", className)}>
      <span className="flex text-brand">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} size={13} filled={i < Math.round(value)} className={i < Math.round(value) ? "" : "text-faint"} />
        ))}
      </span>
      <span className="font-bold text-strong">{value.toFixed(1)}</span>
      {reviews != null && <span className="text-faint">({reviews})</span>}
    </div>
  );
}

export function Avatar({
  src,
  alt,
  name,
  size = 48,
  className,
}: {
  src?: string;
  alt?: string;
  name?: string;
  size?: number;
  className?: string;
}) {
  const initials = (name ?? "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? name ?? ""}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={cn("rounded-xl object-cover shrink-0", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={cn("grid place-items-center rounded-xl bg-gradient-brand text-brand-ink font-bold shrink-0", className)}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
