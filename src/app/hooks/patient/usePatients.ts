import { patientService } from "@/services/patient/patientService";
import { useQuery } from "@tanstack/react-query";

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: patientService.findAll,
  });
}
