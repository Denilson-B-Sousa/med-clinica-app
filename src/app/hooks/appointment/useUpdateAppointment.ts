import { appointmentService } from "@/services/appointment/appointmentService";
import type { UpdateAppointmentPayload } from "@/types/Appointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateAppointmentData = {
  id: string;
  data: UpdateAppointmentPayload;
};

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateAppointmentData) =>
      appointmentService.update(id, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["appointments"] }),
        queryClient.invalidateQueries({ queryKey: ["next-appointment"] }),
      ]);
    },
  });
}
