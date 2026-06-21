import { doctorService } from "@/services/doctor/doctorService";
import type { MedicalSpeciality } from "@/types/Doctor";
import { useQuery } from "@tanstack/react-query";

export function useDoctors(speciality?: MedicalSpeciality) {
  return useQuery({
    queryKey: ["doctors", speciality],
    queryFn: () => doctorService.findAll(speciality),
  });
}
