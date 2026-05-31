import { api } from "@/lib/api";
import type { Doctor } from "@/types/Doctor";

export const doctorService = {
  async findAll(): Promise<Doctor[]> {
    const { data } = await api.get("/medicos");
    return data;
  },

  async findById(id: string): Promise<Doctor> {
    const { data } = await api.get(`/medicos/${id}`);
    return data;
  },
}
