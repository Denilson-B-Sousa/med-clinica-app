export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELED";
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleAt: string;
  status: AppointmentStatus;
  durationInMinutes: number;
  notes?: string;
}

export type AppointmentDoctorAddress = {
  city: string;
  street: string;
  number: string;
};

export type AppointmentDoctor = {
  id: string;
  name: string;
  crm: string;
  speciality: string;
  address: AppointmentDoctorAddress;
};

export type AppointmentHistoryItem = Pick<
  Appointment,
  "id" | "scheduleAt" | "status" | "durationInMinutes"
> & {
  doctor: AppointmentDoctor;
};

export type AppointmentHistoryParams = {
  page?: number;
  size?: number;
  status?: Extract<AppointmentStatus, "SCHEDULED" | "COMPLETED" | "CANCELED">;
  search?: string;
};

export type AppointmentHistoryPage = {
  content: AppointmentHistoryItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type CreateAppointmentPayload = Omit<Appointment, "id">;

export type UpdateAppointmentPayload = Partial<
  Pick<
    Appointment,
    "doctorId" | "scheduleAt" | "status" | "durationInMinutes" | "notes"
  >
>;
