
import { useMutation } from "@tanstack/react-query";
import { createPatient } from "@/services/patientService";


export function useRegisterPatient() {
  return useMutation({
    mutationFn: createPatient,
  })
}