import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Props = {
  title: string;
  eyebrow?: string;
  subtitle?: ReactNode;
  align?: "start" | "center";
  className?: string;
  children?: ReactNode;
};

export default function SectionHeading({
  title,
  eyebrow,
  subtitle,
  align = "start",
  className,
  children,
}: Props) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex items-end justify-between flex-wrap gap-4",
        centered && "flex-col items-center text-center",
        className,
      )}
    >
      <div className={cn(centered && "max-w-2xl")}>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs text-muted">
            {eyebrow}
          </span>
        )}
        <h2 className={cn("mt-3 text-[34px] sm:text-[40px] leading-tight font-bold font-display text-strong text-3d", centered && "text-center")}>
          {title}
        </h2>
        {centered && (
          <div className="ornament mt-4">
            <span />
          </div>
        )}
        {subtitle && <p className={cn("mt-3 text-muted", centered ? "mx-auto" : "max-w-xl")}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
