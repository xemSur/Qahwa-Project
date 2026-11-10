import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const fieldBase = cn(
  "w-full rounded-xl border border-line bg-input px-3 py-2.5 text-sm text-strong",
  "outline-none transition focus:border-brand placeholder:text-faint",
);

type FieldShellProps = {
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FieldShell({ label, hint, error, children, className }: FieldShellProps) {
  return (
    <div className={className}>
      {label && <label className="block text-xs text-muted mb-1.5">{label}</label>}
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-danger-600 dark:text-danger-300">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-faint">{hint}</p>
      ) : null}
    </div>
  );
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  label?: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
  className?: string;
};

export function Input({ label, hint, error, icon, className, ...rest }: InputProps) {
  return (
    <FieldShell label={label} hint={hint} error={error}>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 right-3 grid place-items-center text-faint pointer-events-none">{icon}</span>
        )}
        <input
          className={cn(fieldBase, icon && "pr-10", error && "border-danger-500", className)}
          {...rest}
        />
      </div>
    </FieldShell>
  );
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function Select({ label, hint, error, className, children, ...rest }: SelectProps) {
  return (
    <FieldShell label={label} hint={hint} error={error}>
      <select className={cn(fieldBase, "appearance-none cursor-pointer", error && "border-danger-500", className)} {...rest}>
        {children}
      </select>
    </FieldShell>
  );
}

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function Textarea({ label, hint, error, className, ...rest }: TextareaProps) {
  return (
    <FieldShell label={label} hint={hint} error={error}>
      <textarea className={cn(fieldBase, "resize-none", error && "border-danger-500", className)} {...rest} />
    </FieldShell>
  );
}
