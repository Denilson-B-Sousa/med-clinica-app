import { appointmentService } from "@/services/appointment/appointmentService";
import { useQuery } from "@tanstack/react-query";

export function useNextAppointment() {
  return useQuery({
    queryKey: ["next-appointment"],
    queryFn: async () => {
      const [scheduledAppointments, confirmedAppointments] = await Promise.all([
        appointmentService.findHistory({
          page: 0,
          size: 1,
          status: "SCHEDULED",
        }),
        appointmentService.findHistory({
          page: 0,
          size: 1,
          status: "CONFIRMED",
        }),
      ]);

      return (
        [...scheduledAppointments.content, ...confirmedAppointments.content]
          .sort(
            (first, second) =>
              new Date(first.scheduleAt).getTime() -
              new Date(second.scheduleAt).getTime(),
          )[0] ?? null
      );
    },
  });
}
