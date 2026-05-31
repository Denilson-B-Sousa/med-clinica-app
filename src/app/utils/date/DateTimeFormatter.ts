import { format, formatDistanceToNowStrict, isToday, isTomorrow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function getAppointmentDay(date: string) {
  return format(new Date(date), "dd")
}

export function getAppointmentTime(date: string) {
  return format(new Date(date), "HH:mm");
}

export function getTimeUntilAppointment(date: string) {
  return formatDistanceToNowStrict(new Date(date), {
    locale: ptBR,
    addSuffix: false,
  });
}

export function getAppointmentLabel(date: string) {
  const appointmentDate = new Date(date);

  if (isToday(appointmentDate)) {
    return "Hoje";
  }

  if (isTomorrow(appointmentDate)) {
    return "Amanhã";
  }

  return format(appointmentDate, "EEEE", {
    locale: ptBR,
  });
}

export function getAppointmentMonth(date: string) {
  return format(new Date(date), "MMM", {
    locale: ptBR,
  }).toUpperCase();
}
 