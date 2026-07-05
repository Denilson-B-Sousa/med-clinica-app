import type { AppointmentHistoryItem } from "@/types/Appointment";
import {
  getAppointmentDay,
  getAppointmentLabel,
  getAppointmentMonth,
  getAppointmentTime,
  getTimeUntilAppointment,
} from "@/utils/date/DateTimeFormatter";
import { CalendarCheck } from "phosphor-react";

type NextAppointmentCardProps = {
  appointment: AppointmentHistoryItem;
};

export function NextAppointmentCard({ appointment }: NextAppointmentCardProps) {
  const day = getAppointmentDay(appointment.scheduleAt);
  const month = getAppointmentMonth(appointment.scheduleAt);
  const time = getAppointmentTime(appointment.scheduleAt);
  const label = getAppointmentLabel(appointment.scheduleAt);
  const distance = getTimeUntilAppointment(appointment.scheduleAt);

  return (
    <div className="rounded-xl rounded-r-none bg-blue-500 p-8 text-white">
      <span className="inline-block px-4 py-2 text-sm font-medium">
        PRÓXIMA CONSULTA
      </span>

      <div className="mt-8 flex items-center gap-3">
        <CalendarCheck size={48} />
        <span className="text-lg">{label}</span>
      </div>

      <div className="mt-6 flex items-baseline-last justify-center">
        <h1 className="text-7xl font-bold leading-none">{day}</h1>
        <span className="text-4xl font-light uppercase">{month}</span>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="text-3xl font-semibold">às {time}</span>
      </div>

      <div className="my-4 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/70" />
        <span>Faltam {distance}</span>
        <div className="h-px flex-1 bg-white/70" />
      </div>
    </div>
  );
}
