import { logoutUser } from "@/services/user/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogoutUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSettled: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
}
