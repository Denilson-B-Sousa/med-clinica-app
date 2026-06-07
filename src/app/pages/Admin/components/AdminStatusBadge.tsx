import type { AppointmentStatus } from "@/types/Appointment";
import type { AdminUserStatus } from "../types";

const appointmentStatusClasses: Record<AppointmentStatus, string> = {
  SCHEDULED: "bg-blue-100 text-blue-700",
  CONFIRMED: "bg-emerald-100 text-emerald-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELED: "bg-red-100 text-red-700",
};

const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  SCHEDULED: "Agendada",
  CONFIRMED: "Confirmada",
  COMPLETED: "Realizada",
  CANCELED: "Cancelada",
};

const userStatusClasses: Record<AdminUserStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  INACTIVE: "bg-slate-200 text-slate-600",
};

const userStatusLabels: Record<AdminUserStatus, string> = {
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
};

type AdminStatusBadgeProps =
  | {
      type: "appointment";
      status: AppointmentStatus;
    }
  | {
      type: "user";
      status: AdminUserStatus;
    };

export function AdminStatusBadge(props: AdminStatusBadgeProps) {
  const className =
    props.type === "appointment"
      ? appointmentStatusClasses[props.status]
      : userStatusClasses[props.status];
  const label =
    props.type === "appointment"
      ? appointmentStatusLabels[props.status]
      : userStatusLabels[props.status];

  return (
    <span
      className={`inline-flex min-w-20 justify-center rounded-md px-3 py-1 text-xs font-bold uppercase ${className}`}
    >
      {label}
    </span>
  );
}
