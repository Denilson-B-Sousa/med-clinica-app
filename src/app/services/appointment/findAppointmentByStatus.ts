import { api } from "@/lib/api";
import type { Appointment } from "@/types/Appointment";

export async function findAppointmentsByStatus(
  status: string,
) : Promise<Appointment[]> {

  const { data } = await api.get("/consultas", {
    params: {
      status,
    },
  });

  return data;

}