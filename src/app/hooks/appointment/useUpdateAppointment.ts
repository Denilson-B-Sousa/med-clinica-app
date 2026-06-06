import { appointmentService } from "@/services/appointment/appointmentService";
import type { RescheduleAppointmentPayload } from "@/types/Appointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateAppointmentData = {
  id: string;
  data: RescheduleAppointmentPayload;
};

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateAppointmentData) =>
      appointmentService.reschedule(id, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["appointments"] }),
        queryClient.invalidateQueries({ queryKey: ["next-appointment"] }),
        queryClient.invalidateQueries({ queryKey: ["appointment-to-reschedule"] }),
      ]);
    },
  });
}
