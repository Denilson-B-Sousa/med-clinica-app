import type { AppointmentStatus } from "@/types/Appointment";

export type AdminAppointmentRow = {
  id: string;
  date: string;
  time: string;
  clinicUnitId: string;
  clinicUnitName: string;
  clinicUnitAddress: string;
  doctorName: string;
  patientName: string;
  speciality: string;
  status: AppointmentStatus;
  canCancel: boolean;
};

export type AdminAppointmentsFilterValues = {
  clinicUnitId: string;
  doctorId: string;
  patientName: string;
  status: "" | AppointmentStatus;
  date: string;
  period: "" | "DAY" | "MORNING" | "AFTERNOON" | "EVENING";
};

export type AdminAppointmentsParams = Partial<AdminAppointmentsFilterValues> & {
  page?: number;
  size?: number;
};

export type AdminAppointmentsPage = {
  content: AdminAppointmentRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
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
  clinicUnitId: string;
  clinicUnitName: string;
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
  clinicUnitId: string;
  clinicUnitName: string;
  speciality: string;
  status: AdminUserStatus;
};

export type AdminClinicUnitOption = {
  id: string;
  name: string;
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
  crm?: string;
  speciality?: string;
  clinicUnitId?: string;
  clinicUnitName?: string;
  cpf: string;
  email: string;
  phone: string;
  status: AdminUserStatus;
};

export type AdminUsersPage = {
  content: AdminUserRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type AdminUserKind = "patients" | "doctors";

export type AdminAuditAction =
  | "LOGIN"
  | "SCHEDULE_APPOINTMENT"
  | "RESCHEDULE_APPOINTMENT"
  | "CANCEL_APPOINTMENT"
  | "CREATE_DOCTOR"
  | "UPDATE_USER_STATUS";

export type AdminAuditLogRow = {
  id: string;
  action: AdminAuditAction;
  userName: string;
  userRole: "ADMIN" | "PATIENT" | "DOCTOR";
  target: string;
  date: string;
  time: string;
};
