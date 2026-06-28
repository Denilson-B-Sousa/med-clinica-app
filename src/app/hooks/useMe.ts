import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "@/services/user/authService";


export function useMe() {

  return useQuery({
    queryKey: ["me"],

    queryFn: async () => {
      return getAuthenticatedUser();
    },
    
    retry: false,
    staleTime: 1000 * 60 * 5 // cache 5 min
  })
}
