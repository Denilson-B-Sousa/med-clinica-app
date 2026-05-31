import type { ReactNode } from "react";

type EmptyStateProps = {
  illustration?: ReactNode;
  title: string;
  description: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
};

export function EmptyState({
  illustration,
  title,
  description,
  primaryAction,
  secondaryAction
}: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 py-10 text-center">
      {illustration && (
        <div className="mb-6 flex justify-center">{illustration}</div>
      )}

      <h2 className="mb-2 text-2xl font-semibold text-slate-800">{title}</h2>

      <p className="mb-8 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="flex w-full max-w-sm flex-col gap-3">
        {primaryAction}
        {secondaryAction}
      </div>
    </div>
  );
}
