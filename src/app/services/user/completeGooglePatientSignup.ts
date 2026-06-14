
import { api } from "@/lib/api";
import type { GooglePatientRegisterRequest } from "@/types/GooglePatientRegisterRequest";

export async function completeGooglePatientSignup(data: GooglePatientRegisterRequest) {
  await api.post("/auth/google/complete-patient", data);
}
