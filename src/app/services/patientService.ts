
import { api } from "@/api/api";
import type { CreatePatientPayload } from "@/types/Patient";

export async function createPatient(payload: CreatePatientPayload) {
  const response = await api.post("/pacientes", payload);
  return response.data;
}