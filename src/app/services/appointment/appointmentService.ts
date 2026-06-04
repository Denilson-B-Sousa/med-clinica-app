import { api } from "@/lib/api";
import type {
  Appointment,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
} from "@/types/Appointment";

export const appointmentService = {
  async findAll(): Promise<Appointment[]> {
    const { data } = await api.get("/consultas");
    return data;
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
    const { data } = await api.patch(`/consultas/${id}`, payload);
    return data;
  },

  async cancel(id: string): Promise<Appointment> {
    const { data } = await api.patch(`/consultas/${id}`, {
      status: "CANCELED",
    });

    return data;
  },
};
