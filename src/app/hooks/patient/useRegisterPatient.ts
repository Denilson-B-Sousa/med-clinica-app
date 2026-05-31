
import { useMutation } from "@tanstack/react-query";
import { createPatient } from "@/services/patient/patientService";

export function useRegisterPatient() {
  return useMutation({
    mutationFn: createPatient,
  })
}