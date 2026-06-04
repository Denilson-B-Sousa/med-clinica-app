import { doctorService } from "@/services/doctor/doctorService";
import { useQuery } from "@tanstack/react-query";

export function useDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: doctorService.findAll,
  });
}
