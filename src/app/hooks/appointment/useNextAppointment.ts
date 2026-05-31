import { findAppointmentsByStatus } from "@/services/appointment/findAppointmentByStatus";
import { useQuery } from "@tanstack/react-query";

export function useNextAppointment() {
  return useQuery({
    queryKey: ["next-appointment"],
    queryFn: async () => {
      const appointment = await findAppointmentsByStatus("SCHEDULED");
      return appointment[0] ?? null;
    },
  });
}
