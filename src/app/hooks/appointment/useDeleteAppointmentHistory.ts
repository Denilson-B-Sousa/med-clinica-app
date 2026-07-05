import { appointmentService } from "@/services/appointment/appointmentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAppointmentHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentService.deleteFromHistory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["appointments", "history"] });
    },
  });
}
