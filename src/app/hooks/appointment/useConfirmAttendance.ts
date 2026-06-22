import { appointmentService } from "@/services/appointment/appointmentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useConfirmAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentService.confirmAttendance,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["appointments"] }),
        queryClient.invalidateQueries({ queryKey: ["next-appointment"] }),
        queryClient.invalidateQueries({ queryKey: ["appointment-to-reschedule"] }),
      ]);
    },
  });
}
