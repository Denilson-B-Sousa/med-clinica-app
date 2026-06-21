import { api } from "@/lib/api";
import type {
  Appointment,
  AppointmentHistoryItem,
  AppointmentHistoryPage,
  AppointmentHistoryParams,
  CreateAppointmentPayload,
  RescheduleAppointmentPayload,
  UpdateAppointmentPayload,
} from "@/types/Appointment";

type AppointmentHistoryApiResponse =
  | AppointmentHistoryItem[]
  | {
      content?: AppointmentHistoryItem[];
      data?: AppointmentHistoryItem[];
      items?: AppointmentHistoryItem[];
      page?: number;
      number?: number;
      size?: number;
      totalElements?: number;
      totalPages?: number;
    };

function normalizeHistoryResponse(
  data: AppointmentHistoryApiResponse,
  params: AppointmentHistoryParams,
): AppointmentHistoryPage {
  if (Array.isArray(data)) {
    return {
      content: data,
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
    content,
    page: data.number ?? data.page ?? params.page ?? 0,
    size,
    totalElements,
    totalPages:
      data.totalPages ?? (size > 0 ? Math.ceil(totalElements / size) : 0),
  };
}

export const appointmentService = {
  async findAll(): Promise<Appointment[]> {
    const { data } = await api.get("/consultas");
    return data;
  },

  async findHistory(
    params: AppointmentHistoryParams = {},
  ): Promise<AppointmentHistoryPage> {
    const { data } = await api.get<AppointmentHistoryApiResponse>(
      "/consultas/historico",
      {
        params: {
          page: params.page ?? 0,
          size: params.size ?? 5,
          status: params.status,
          search: params.search?.trim() || undefined,
        },
      },
    );

    return normalizeHistoryResponse(data, params);
  },

  async findById(id: string): Promise<Appointment> {
    const { data } = await api.get(`/consultas/${id}`);
    return data;
  },

  async create(payload: CreateAppointmentPayload): Promise<Appointment> {
    const { data } = await api.post("/consultas", payload);
    return data;
  },

  async update(
    id: string,
    payload: UpdateAppointmentPayload,
  ): Promise<Appointment> {
    const { data } = await api.put(`/consultas/${id}`, payload);
    return data;
  },

  async reschedule(
    id: string,
    payload: RescheduleAppointmentPayload,
  ): Promise<Appointment> {
    const { data } = await api.put(`/consultas/${id}`, payload);
    return data;
  },

  async cancel(id: string): Promise<void> {
    await api.delete(`/consultas/${id}`);
  },
};
