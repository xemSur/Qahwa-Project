import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradientBorder?: boolean;
};

export default function Card({ children, className, hover = false, glow = false, gradientBorder = false }: Props) {
  if (gradientBorder) {
    return (
      <div
        className={cn(
          "relative rounded-2xl p-[1px]",
          glow ? "shadow-glow" : "shadow-lg",
          "bg-gradient-to-b from-brand/60 to-line",
          hover && "transition hover:-translate-y-1 hover:shadow-xl",
          className,
        )}
      >
        <div className="rounded-2xl h-full bg-card">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-card",
        glow ? "shadow-glow" : "shadow-sm",
        hover && "transition hover:-translate-y-1 hover:shadow-lg hover:border-brand/60",
        className,
      )}
    >
      {children}
    </div>
  );
}
