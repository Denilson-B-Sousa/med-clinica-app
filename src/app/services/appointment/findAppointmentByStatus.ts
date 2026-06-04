import { api } from "@/lib/api";
import { appointmentService } from "./appointmentService";
import type { Appointment } from "@/types/Appointment";

export async function findAppointmentsByStatus(
  status?: string,
) : Promise<Appointment[]> {
  if (!status) {
    return appointmentService.findAll();
  }

  const { data } = await api.get("/consultas", {
    params: {
      status,
    },
  });

  return data;

}
