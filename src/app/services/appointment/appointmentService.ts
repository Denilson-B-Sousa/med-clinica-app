import { api } from "@/lib/api";
import type {
  Appointment,
  CreateAppointmentPayload,
} from "@/types/Appointment";

export const appointmentService = {
  async create(payload: CreateAppointmentPayload): Promise<Appointment> {
    const { data } = await api.post("/consultas", payload);
    return data;
  },
};
