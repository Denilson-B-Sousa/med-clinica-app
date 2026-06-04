import { useNextAppointment } from "@/hooks/appointment/useNextAppointment";
import {
  AppointmentOverview,
  NoAppointmentState,
  PatientWelcome,
} from "./components";

export function PatientArea() {
  const { data: appointment } = useNextAppointment();

  return (
    <>
      <PatientWelcome />
      {appointment ? (
        <AppointmentOverview appointment={appointment} />
      ) : (
        <NoAppointmentState />
      )}
    </>
  );
}
