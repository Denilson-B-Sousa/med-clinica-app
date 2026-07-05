import { appointmentService } from "@/services/appointment/appointmentService";
import type { AppointmentAvailabilityParams } from "@/types/Appointment";
import { useQuery } from "@tanstack/react-query";

export function useAppointmentAvailability(params: AppointmentAvailabilityParams) {
  return useQuery({
    queryKey: ["appointment-availability", params],
    queryFn: () => appointmentService.findAvailability(params),
    enabled: Boolean(params.doctorId && params.clinicUnitId && params.date),
    retry: false,
  });
}
