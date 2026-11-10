import { cn } from "../../utils/cn";

type Props = {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
};

export default function Skeleton({ className, width, height, rounded = "rounded-xl" }: Props) {
  return (
    <div
      className={cn("relative overflow-hidden bg-elevated", rounded, className)}
      style={{ width, height }}
      aria-hidden="true"
    >
      <div className="shimmer absolute inset-0 animate-shimmer" />
    </div>
  );
}
