import { appointmentService } from "@/services/appointment/appointmentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useScheduleAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentService.create,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["appointments"] }),
        queryClient.invalidateQueries({ queryKey: ["next-appointment"] }),
      ]);
    },
  });
}
