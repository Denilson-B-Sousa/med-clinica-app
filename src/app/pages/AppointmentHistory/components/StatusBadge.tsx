import type { AppointmentHistoryItem } from "../constants/appointments";

const STATUS_STYLES: Record<AppointmentHistoryItem["status"], string> = {
  Agendada: "bg-green-100 text-green-700",
  Realizada: "bg-blue-100 text-blue-700",
  Cancelada: "bg-slate-200 text-slate-600",
};

type StatusBadgeProps = {
  status: AppointmentHistoryItem["status"];
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-md px-3 py-1 font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
