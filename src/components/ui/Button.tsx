import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type Variant = "primary" | "solid" | "outline" | "ghost" | "danger" | "accent";
type Size = "sm" | "md" | "lg";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
  variant?: Variant;
  size?: Size;
  shape?: "rounded" | "pill";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

const VARIANTS: Record<Variant, string> = {
  primary: "bg-gradient-brand text-brand-ink shadow-lg shadow-brand-900/25 hover:brightness-110",
  solid: "bg-brand text-brand-ink hover:brightness-110",
  accent: "bg-gradient-to-l from-accent-600 to-accent-700 text-white shadow-lg shadow-accent-900/25 hover:brightness-110",
  outline: "border border-line-strong text-default hover:border-brand hover:bg-brand/10",
  ghost: "text-default hover:bg-elevated",
  danger: "border border-danger-700/50 text-danger-600 dark:text-danger-300 hover:bg-danger-600/10",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  shape = "rounded",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-bold transition",
        "active:scale-[0.98]",
        "disabled:opacity-60 disabled:pointer-events-none",
        shape === "pill" ? "rounded-full" : "rounded-xl",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
