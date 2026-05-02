import { loginUser } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";


export function useLoginUser() {
  return useMutation({

    mutationFn: loginUser,

    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token);
      // Redirecionar para a página principal ou dashboard
      
    }
  })
}