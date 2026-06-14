import { api } from "@/lib/api";

export type GooglePendingSignup = {
  name: string;
  email: string;
};

export async function getGooglePendingSignup() {
  const response = await api.get<GooglePendingSignup>("/auth/google/pending");
  return response.data;
}
