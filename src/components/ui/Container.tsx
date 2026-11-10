import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  maxWidth?: "narrow" | "default" | "wide";
};

const MAX_WIDTHS: Record<Required<Props>["maxWidth"], string> = {
  narrow: "max-w-[800px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1400px]",
};

export default function Container({ children, className, maxWidth = "default" }: Props) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", MAX_WIDTHS[maxWidth], className)}>
      {children}
    </div>
  );
}
