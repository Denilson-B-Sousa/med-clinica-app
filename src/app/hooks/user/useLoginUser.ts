import { loginUser } from "@/services/user/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLoginUser() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: async () => {
      await queryClient.invalidateQueries(
        { queryKey: ["me"] }
      );
    },
  });
}