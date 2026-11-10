import { cn } from "../../utils/cn";

type Props = {
  /** Position of the glow source */
  position?: "top-start" | "top-end" | "center" | "bottom-center";
  color?: "brand" | "accent";
  className?: string;
};

const POSITIONS: Record<Required<Props>["position"], string> = {
  "top-start": "top-0 right-0",
  "top-end": "top-0 left-0",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
};

export default function AmbientGlow({ position = "top-end", color = "brand", className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute size-[520px] rounded-full blur-3xl opacity-60",
        POSITIONS[position],
        className,
      )}
      style={{
        background: `radial-gradient(circle, var(--glow-${color}) 0%, transparent 65%)`,
      }}
    />
  );
}
