import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";


export function useMe() {

  return useQuery({
    queryKey: ["me"],

    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data;
    },
    
    retry: false,
    staleTime: 1000 * 60 * 5 // cache 5 min
  })
}