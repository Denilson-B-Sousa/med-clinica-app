import { appointmentService } from "@/services/appointment/appointmentService";
import type { AppointmentHistoryParams } from "@/types/Appointment";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useAppointments(params: AppointmentHistoryParams = {}) {
  return useQuery({
    queryKey: ["appointments", "history", params],
    queryFn: () => appointmentService.findHistory(params),
    placeholderData: keepPreviousData,
  });
}
