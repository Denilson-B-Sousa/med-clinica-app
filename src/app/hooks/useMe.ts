import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";


export function useMe() {
  const token = sessionStorage.getItem("token");

  return useQuery({
    queryKey: ["me", token],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data;
    },
    enabled: !!token, // só roda com token
    staleTime: 1000 * 60 * 5 // cache 5 min
  })
}