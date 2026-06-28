import { api } from "@/lib/api";
import type { UserLoginPayload, LoginResponse } from "@/types/Auth";

export async function loginUser(payload: UserLoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
}

export async function getAuthenticatedUser() {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function logoutUser(): Promise<void> {
  await api.post("/auth/logout");
}
