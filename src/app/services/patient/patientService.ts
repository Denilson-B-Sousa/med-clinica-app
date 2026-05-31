
import { api } from "@/lib/api";
import type { CreatePatientPayload, Patient } from "@/types/Patient";

export async function createPatient(payload: CreatePatientPayload) {
  const response = await api.post("/pacientes", payload);
  return response.data;
}

export const patientService = {
  async findById(id: string): Promise<Patient> {
    const { data } = await api.get(`/patients/${id}`);
    return data;
  },
};