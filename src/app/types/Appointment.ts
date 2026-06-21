export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELED";
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicUnitId?: string;
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

export type AppointmentClinicUnit = {
  id: string;
  name: string;
  phone?: string;
  address?: AppointmentDoctorAddress & {
    district?: string;
    state?: string;
    zipcode?: string;
  };
};

export type AppointmentHistoryItem = Pick<
  Appointment,
  "id" | "clinicUnitId" | "scheduleAt" | "status" | "durationInMinutes"
> & {
  doctor: AppointmentDoctor;
  clinicUnit?: AppointmentClinicUnit;
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

export type CreateAppointmentPayload = Pick<
  Appointment,
  | "patientId"
  | "doctorId"
  | "clinicUnitId"
  | "scheduleAt"
  | "status"
  | "durationInMinutes"
>;

export type RescheduleAppointmentPayload = {
  scheduleAt: string;
  clinicUnitId?: string;
};

export type UpdateAppointmentPayload = Partial<
  Pick<Appointment, "scheduleAt" | "clinicUnitId" | "status">
>;
