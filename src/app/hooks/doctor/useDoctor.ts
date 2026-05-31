import { useQuery } from "@tanstack/react-query";
import { doctorService } from "@/services/doctor/doctorService";

export function useDoctor(id: string) {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: () => doctorService.findById(id),
    enabled: !!id,
  });
}
