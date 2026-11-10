import { type ReactNode } from "react";

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16">
      <span className="size-6 rounded-full border-2 border-brand border-t-transparent animate-spin" />
      {label && <span className="text-sm text-muted">{label}</span>}
    </div>
  );
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl border border-danger-700/50 bg-danger-600/10 px-4 py-3 text-sm text-danger-600 dark:text-danger-300 flex items-center justify-between">
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-danger-600/20 px-3 py-1 text-xs font-bold hover:bg-danger-600/30 transition"
        >
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-brand/15 text-brand",
  CONFIRMED: "bg-accent-600/15 text-accent-700 dark:text-accent-400",
  IN_PROGRESS: "bg-sky-600/15 text-sky-700 dark:text-sky-400",
  COMPLETED: "bg-elevated text-default",
  CANCELLED: "bg-danger-600/15 text-danger-600 dark:text-danger-300",
};

export const STATUS_LABELS: Record<string, string> = {
  PENDING: "قيد الانتظار",
  CONFIRMED: "مؤكد",
  IN_PROGRESS: "قيد التنفيذ",
  COMPLETED: "مكتمل",
  CANCELLED: "ملغي",
};

export const BOOKING_STATUSES = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${
        STATUS_COLORS[status] || "bg-elevated text-default"
      }`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export function Card({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-card overflow-hidden shadow-sm">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="font-bold text-strong">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-xs text-muted">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export const inputCls =
  "w-full rounded-xl border border-line bg-input px-3 py-2.5 text-sm text-strong outline-none transition focus:border-brand";
export const inputStyle = undefined;

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-bold text-brand-ink shadow-lg shadow-brand-900/25 hover:brightness-110 disabled:opacity-60 transition"
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, danger }: { children: ReactNode; onClick?: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${
        danger
          ? "border-danger-700/50 text-danger-600 dark:text-danger-300 hover:bg-danger-600/10"
          : "border-line-strong text-default hover:border-brand hover:text-brand"
      }`}
    >
      {children}
    </button>
  );
}

export function confirmDelete(label: string): boolean {
  return window.confirm(`هل أنت متأكد من حذف ${label}؟`);
}
