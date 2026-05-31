export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleAt: string;
  status: AppointmentStatus;
  durationInMinutes: number;
}
