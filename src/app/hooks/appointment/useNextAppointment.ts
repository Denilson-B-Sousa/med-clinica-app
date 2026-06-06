import { appointmentService } from "@/services/appointment/appointmentService";
import { useQuery } from "@tanstack/react-query";

export function useNextAppointment() {
  return useQuery({
    queryKey: ["next-appointment"],
    queryFn: async () => {
      const appointments = await appointmentService.findHistory({
        page: 0,
        size: 1,
        status: "SCHEDULED",
      });

      return appointments.content[0] ?? null;
    },
  });
}
