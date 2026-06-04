import type { AppointmentStatus } from "@/types/Appointment";

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  SCHEDULED: "bg-green-100 text-green-700",
  CONFIRMED: "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELED: "bg-slate-200 text-slate-600",
  CANCELLED: "bg-slate-200 text-slate-600",
};

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  SCHEDULED: "Agendada",
  CONFIRMED: "Confirmada",
  COMPLETED: "Realizada",
  CANCELED: "Cancelada",
  CANCELLED: "Cancelada",
};

type StatusBadgeProps = {
  status: AppointmentStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-md px-3 py-1 font-semibold ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
