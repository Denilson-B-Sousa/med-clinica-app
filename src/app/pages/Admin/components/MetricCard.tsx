import { CalendarBlank, CheckCircle, Clock, XCircle } from "phosphor-react";
import type { AdminMetric } from "../types";

const toneClasses: Record<AdminMetric["tone"], string> = {
  blue: "bg-blue-100 text-blue-600",
  cyan: "bg-cyan-100 text-cyan-600",
  violet: "bg-violet-100 text-violet-600",
  red: "bg-red-100 text-red-600",
};

const metricIcons = {
  today: CalendarBlank,
  scheduled: Clock,
  completed: CheckCircle,
  canceled: XCircle,
};

type MetricCardProps = {
  metric: AdminMetric;
};

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = metricIcons[metric.id as keyof typeof metricIcons] ?? CalendarBlank;
  const trendClass =
    metric.trend?.tone === "negative" ? "text-red-600" : "text-emerald-600";
  const trendPrefix = metric.trend?.tone === "negative" ? "^" : "^";

  return (
    <article className="grid min-h-28 grid-cols-[64px_1fr] items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${toneClasses[metric.tone]}`}
      >
        <Icon size={32} weight="bold" />
      </div>

      <div>
        <p className="text-sm font-bold text-[#20375F]">{metric.label}</p>
        <strong className="mt-1 block text-3xl leading-none text-[#0B1F4D]">
          {metric.value}
        </strong>
        <p className="mt-2 text-xs font-medium text-slate-500">
          {metric.trend && (
            <span className={`mr-1 font-bold ${trendClass}`}>
              {trendPrefix} {metric.trend.value}
            </span>
          )}
          {metric.helper}
        </p>
      </div>
    </article>
  );
}
