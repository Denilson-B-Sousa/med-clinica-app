import { useQuery } from "@tanstack/react-query";
import { getGooglePendingSignup } from "@/services/user/googleAuthService";

export function useGooglePendingSignup(enabled = true) {
  return useQuery({
    queryKey: ["googlePendingSignup"],
    queryFn: getGooglePendingSignup,
    enabled,
    retry: false
  })
}
