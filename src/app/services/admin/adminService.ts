import { api } from "@/lib/api";
import type {
  Appointment,
  AuthorizedAppointmentExceptionPayload,
} from "@/types/Appointment";
import type {
  AdminAppointmentRow,
  AdminAppointmentsPage,
  AdminAppointmentsParams,
  AdminDoctorOption,
  AdminUserKind,
  AdminUserRow,
  AdminUserStatus,
  AdminUsersPage,
} from "@/pages/Admin/types";

type AdminAppointmentApiItem = Partial<AdminAppointmentRow> & {
  scheduleAt?: string;
  clinicUnit?: {
    id?: string;
    name?: string;
    address?: {
      street?: string;
      number?: string;
      district?: string;
      city?: string;
      state?: string;
    };
  };
  doctor?: {
    id?: string;
    name?: string;
    speciality?: string;
  };
  patient?: {
    id?: string;
    name?: string;
  };
};

type AdminAppointmentsApiResponse =
  | AdminAppointmentApiItem[]
  | {
      content?: AdminAppointmentApiItem[];
      data?: AdminAppointmentApiItem[];
      items?: AdminAppointmentApiItem[];
      page?: number;
      number?: number;
      size?: number;
      totalElements?: number;
      totalPages?: number;
    };

type AdminDoctorApiItem = Partial<AdminDoctorOption> & {
  doctorId?: string;
  idDoctor?: string;
  idMedico?: string;
  unitId?: string;
  unidadeClinicaId?: string;
  clinicUnit?: {
    id?: string;
    name?: string;
  };
};

type AdminDoctorsApiResponse =
  | AdminDoctorApiItem[]
  | {
      content?: AdminDoctorApiItem[];
      data?: AdminDoctorApiItem[];
      items?: AdminDoctorApiItem[];
    };

type AdminUserApiItem = Partial<AdminUserRow> & {
  patientId?: string;
  doctorId?: string;
  userId?: string;
  nome?: string;
  telefone?: string;
  active?: boolean;
  clinicUnit?: {
    id?: string;
    name?: string;
  };
};

type AdminUsersApiResponse =
  | AdminUserApiItem[]
  | {
      content?: AdminUserApiItem[];
      data?: AdminUserApiItem[];
      items?: AdminUserApiItem[];
      page?: number;
      number?: number;
      size?: number;
      totalElements?: number;
      totalPages?: number;
    };

function formatDateTime(scheduleAt?: string) {
  if (!scheduleAt) {
    return {
      date: "-",
      time: "-",
    };
  }

  const date = new Date(scheduleAt);

  if (Number.isNaN(date.getTime())) {
    const [rawDate = "-", rawTime = "-"] = scheduleAt.split("T");
    return {
      date: rawDate,
      time: rawTime.slice(0, 5),
    };
  }

  return {
    date: new Intl.DateTimeFormat("pt-BR").format(date),
    time: new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
  };
}

function formatClinicUnitAddress(item: AdminAppointmentApiItem) {
  if (item.clinicUnitAddress) {
    return item.clinicUnitAddress;
  }

  const address = item.clinicUnit?.address;

  if (!address) {
    return "-";
  }

  return [address.street, address.number, address.district]
    .filter(Boolean)
    .join(", ");
}

function normalizeAppointment(item: AdminAppointmentApiItem): AdminAppointmentRow {
  const formattedDateTime = formatDateTime(item.scheduleAt);

  return {
    id: item.id ?? "",
    date: item.date ?? formattedDateTime.date,
    time: item.time ?? formattedDateTime.time,
    clinicUnitId: item.clinicUnitId ?? item.clinicUnit?.id ?? "",
    clinicUnitName: item.clinicUnitName ?? item.clinicUnit?.name ?? "-",
    clinicUnitAddress: formatClinicUnitAddress(item),
    doctorName: item.doctorName ?? item.doctor?.name ?? "-",
    patientName: item.patientName ?? item.patient?.name ?? "-",
    speciality: item.speciality ?? item.doctor?.speciality ?? "-",
    status: item.status ?? "SCHEDULED",
    canCancel:
      item.canCancel ??
      (item.status !== "COMPLETED" && item.status !== "CANCELED"),
  };
}

function normalizeAppointmentsResponse(
  data: AdminAppointmentsApiResponse,
  params: AdminAppointmentsParams,
): AdminAppointmentsPage {
  if (Array.isArray(data)) {
    return {
      content: data.map(normalizeAppointment).filter((appointment) => appointment.id),
      page: params.page ?? 0,
      size: params.size ?? data.length,
      totalElements: data.length,
      totalPages: data.length > 0 ? 1 : 0,
    };
  }

  const content = data.content ?? data.data ?? data.items ?? [];
  const size = data.size ?? params.size ?? content.length;
  const totalElements = data.totalElements ?? content.length;

  return {
    content: content
      .map(normalizeAppointment)
      .filter((appointment) => appointment.id),
    page: data.number ?? data.page ?? params.page ?? 0,
    size,
    totalElements,
    totalPages:
      data.totalPages ?? (size > 0 ? Math.ceil(totalElements / size) : 0),
  };
}

function normalizeDoctor(doctor: AdminDoctorApiItem): AdminDoctorOption {
  return {
    id: doctor.id ?? doctor.doctorId ?? doctor.idDoctor ?? doctor.idMedico ?? "",
    name: doctor.name ?? "Médico",
    clinicUnitId:
      doctor.clinicUnitId ??
      doctor.unitId ??
      doctor.unidadeClinicaId ??
      doctor.clinicUnit?.id ??
      "",
    clinicUnitName: doctor.clinicUnitName ?? doctor.clinicUnit?.name ?? "-",
    speciality: doctor.speciality ?? "-",
    status: (doctor.status ?? "ACTIVE") as AdminUserStatus,
  };
}

function cleanParams(params: AdminAppointmentsParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== "" && value != null),
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function normalizeUser(user: AdminUserApiItem): AdminUserRow {
  const name = user.name ?? user.nome ?? "Usuário";
  const status =
    user.status ?? (typeof user.active === "boolean" && !user.active
      ? "INACTIVE"
      : "ACTIVE");

  return {
    id: user.id ?? user.userId ?? user.patientId ?? user.doctorId ?? "",
    initials: user.initials ?? getInitials(name),
    name,
    crm: user.crm,
    speciality: user.speciality,
    clinicUnitId: user.clinicUnitId ?? user.clinicUnit?.id,
    clinicUnitName: user.clinicUnitName ?? user.clinicUnit?.name,
    cpf: user.cpf ?? "",
    email: user.email ?? "",
    phone: user.phone ?? user.telefone ?? "",
    status: status as AdminUserStatus,
  };
}

function normalizeUsersResponse(
  data: AdminUsersApiResponse,
  params: { page?: number; size?: number },
): AdminUsersPage {
  if (Array.isArray(data)) {
    return {
      content: data.map(normalizeUser).filter((user) => user.id),
      page: params.page ?? 0,
      size: params.size ?? data.length,
      totalElements: data.length,
      totalPages: data.length > 0 ? 1 : 0,
    };
  }

  const content = data.content ?? data.data ?? data.items ?? [];
  const size = data.size ?? params.size ?? content.length;
  const totalElements = data.totalElements ?? content.length;

  return {
    content: content.map(normalizeUser).filter((user) => user.id),
    page: data.number ?? data.page ?? params.page ?? 0,
    size,
    totalElements,
    totalPages:
      data.totalPages ?? (size > 0 ? Math.ceil(totalElements / size) : 0),
  };
}

export const adminService = {
  async createAuthorizedAppointmentException(
    payload: AuthorizedAppointmentExceptionPayload,
  ): Promise<Appointment> {
    const { data } = await api.post<Appointment>(
      "/admin/appointments/authorized-exceptions",
      payload,
    );
    return data;
  },

  async findAppointments(
    params: AdminAppointmentsParams,
  ): Promise<AdminAppointmentsPage> {
    const { data } = await api.get<AdminAppointmentsApiResponse>(
      "/admin/appointments",
      {
        params: cleanParams(params),
      },
    );

    return normalizeAppointmentsResponse(data, params);
  },

  async deleteAppointment(id: string): Promise<void> {
    await api.delete(`/admin/appointments/${id}`);
  },

  async findDoctors(clinicUnitId?: string): Promise<AdminDoctorOption[]> {
    const { data } = await api.get<AdminDoctorsApiResponse>("/admin/doctors", {
      params: {
        clinicUnitId: clinicUnitId || undefined,
      },
    });
    const doctors = Array.isArray(data) ? data : data.content ?? data.data ?? data.items ?? [];

    return doctors.map(normalizeDoctor).filter((doctor) => doctor.id);
  },

  async findUsers(
    kind: AdminUserKind,
    params: { page?: number; size?: number } = {},
  ): Promise<AdminUsersPage> {
    const endpoint =
      kind === "patients" ? "/admin/patients" : "/admin/doctors/users";
    const { data } = await api.get<AdminUsersApiResponse>(endpoint, {
      params,
    });

    return normalizeUsersResponse(data, params);
  },

  async updateUserStatus(
    userId: string,
    status: AdminUserStatus,
  ): Promise<void> {
    await api.patch(`/admin/users/${userId}/status`, {
      status,
      active: status === "ACTIVE",
    });
  },

  async deleteUser(kind: AdminUserKind, userId: string): Promise<void> {
    const endpoint =
      kind === "patients"
        ? `/admin/patients/${userId}`
        : `/admin/doctors/${userId}`;

    await api.delete(endpoint);
  },
};
