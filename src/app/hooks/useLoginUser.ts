import { loginUser } from "@/services/authService";
import { setToken } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useMutation } from "@tanstack/react-query";

export function useLoginUser() {

  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      dispatch(setToken(data.token));
    },
  });
}