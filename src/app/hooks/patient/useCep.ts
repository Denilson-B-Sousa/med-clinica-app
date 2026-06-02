import { useMutation } from "@tanstack/react-query";
import { getAddressByCep } from "@/services/patient/viacep";

export function useCep() {
  return useMutation({
    mutationFn: getAddressByCep,
  });
}
