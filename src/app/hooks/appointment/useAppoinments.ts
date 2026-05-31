import { findAppointmentsByStatus } from "@/services/appointment/findAppointmentByStatus";
import { useQuery } from "@tanstack/react-query";

export function useAppointments(status: string) {
  return useQuery({
    queryKey: ["appointments", status],
    queryFn: () => findAppointmentsByStatus(status),
  });
}
