import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export default function EmptyState({ icon, title, description, action, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-16 px-6", className)}>
      {icon && (
        <div className="size-16 grid place-items-center rounded-2xl bg-elevated text-faint mb-4">{icon}</div>
      )}
      <h3 className="font-bold text-strong">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
