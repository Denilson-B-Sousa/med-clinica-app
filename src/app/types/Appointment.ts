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
  attendanceConfirmed?: boolean;
  attendanceConfirmedAt?: string;
  warnings?: string[];
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
  | "id"
  | "clinicUnitId"
  | "scheduleAt"
  | "status"
  | "durationInMinutes"
  | "attendanceConfirmed"
  | "attendanceConfirmedAt"
> & {
  doctor: AppointmentDoctor;
  clinicUnit?: AppointmentClinicUnit;
  canDelete: boolean;
};

export type AppointmentHistoryParams = {
  page?: number;
  size?: number;
  status?: AppointmentStatus;
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
  | "doctorId"
  | "clinicUnitId"
  | "scheduleAt"
  | "durationInMinutes"
>;

export type RescheduleAppointmentPayload = {
  scheduleAt: string;
  clinicUnitId: string;
  reason: string;
};

export type AppointmentAvailability = {
  date: string;
  durationInMinutes: number;
  availableTimes: string[];
};

export type AppointmentAvailabilityParams = {
  doctorId: string;
  clinicUnitId: string;
  date: string;
  appointmentId?: string;
};

export type CancelAppointmentPayload = { id: string; reason?: string };

export type AuthorizedAppointmentExceptionPayload = CreateAppointmentPayload & {
  reason: string;
};

export type UpdateAppointmentPayload = Partial<
  Pick<Appointment, "scheduleAt" | "clinicUnitId" | "status">
>;
