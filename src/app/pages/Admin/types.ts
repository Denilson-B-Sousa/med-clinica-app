import type { AppointmentStatus } from "@/types/Appointment";

export type AdminAppointmentRow = {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  patientName: string;
  speciality: string;
  status: AppointmentStatus;
  canCancel: boolean;
};

export type AdminMetric = {
  id: string;
  label: string;
  value: string;
  helper: string;
  trend?: {
    value: string;
    tone: "positive" | "negative" | "neutral";
  };
  tone: "blue" | "cyan" | "violet" | "red";
};

export type AdminAvailableTimes = {
  doctorId: string;
  doctorName: string;
  selectedDate: string;
  selectedPeriod: "DAY" | "MORNING" | "AFTERNOON" | "EVENING";
  dateLabel: string;
  times: string[];
};

export type AdminDoctorOption = {
  id: string;
  name: string;
  speciality: string;
  status: AdminUserStatus;
};

export type AdminScheduleSlotStatus =
  | "AVAILABLE"
  | "SCHEDULED"
  | "COMPLETED"
  | "CANCELED";

export type AdminScheduleSlot = {
  id: string;
  time: string;
  status: AdminScheduleSlotStatus;
  patientName?: string;
  appointmentId?: string;
  canCancel?: boolean;
};

export type AdminUserStatus = "ACTIVE" | "INACTIVE";

export type AdminUserRow = {
  id: string;
  initials: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  status: AdminUserStatus;
};

export type AdminUserKind = "patients" | "doctors";
