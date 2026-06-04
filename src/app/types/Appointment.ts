export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELED"
  | "CANCELLED";

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleAt: string;
  status: AppointmentStatus;
  durationInMinutes: number;
  notes?: string;
}

export type CreateAppointmentPayload = Omit<Appointment, "id">;

export type UpdateAppointmentPayload = Partial<
  Pick<
    Appointment,
    "doctorId" | "scheduleAt" | "status" | "durationInMinutes" | "notes"
  >
>;
