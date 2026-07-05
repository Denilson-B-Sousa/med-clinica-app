import { appointmentService } from "@/services/appointment/appointmentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentService.cancel,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["appointments"] }),
        queryClient.invalidateQueries({ queryKey: ["appointment-to-reschedule"] }),
        queryClient.invalidateQueries({ queryKey: ["next-appointment"] }),
      ]);
    },
  });
}
