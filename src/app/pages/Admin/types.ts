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
  | "LOGOUT"
  | "SCHEDULE_APPOINTMENT"
  | "RESCHEDULE_APPOINTMENT"
  | "CANCEL_APPOINTMENT"
  | "CREATE_DOCTOR"
  | "UPDATE_DOCTOR"
  | "UPDATE_USER_STATUS"
  | "DELETE_USER"
  | "ADMIN_ACCESS_DENIED";

export type AdminAuditLogsParams = {
  search?: string;
  action?: AdminAuditAction;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export type AdminAuditLogRow = {
  id: string;
  action: AdminAuditAction;
  username: string;
  executedAt: string;
  appointmentId?: string;
  patientId?: string;
  doctorId?: string;
  clinicUnitId?: string;
  previousScheduleAt?: string;
  newScheduleAt?: string;
  reason?: string;
  requestId?: string;
};

export type AdminAuditLogsPage = {
  content: AdminAuditLogRow[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};
