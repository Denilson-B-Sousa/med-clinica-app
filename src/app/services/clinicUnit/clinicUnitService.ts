import { api } from "@/lib/api";
import type { ClinicUnit, CreateClinicUnitPayload } from "@/types/ClinicUnit";

type ClinicUnitApiResponse =
  | ClinicUnit[]
  | {
      content?: ClinicUnit[];
      data?: ClinicUnit[];
      items?: ClinicUnit[];
    };

function normalizeClinicUnitsResponse(data: ClinicUnitApiResponse): ClinicUnit[] {
  return Array.isArray(data) ? data : data.content ?? data.data ?? data.items ?? [];
}

export const clinicUnitService = {
  async findAll(): Promise<ClinicUnit[]> {
    const { data } = await api.get<ClinicUnitApiResponse>("/unidades-clinica");
    return normalizeClinicUnitsResponse(data);
  },

  async create(payload: CreateClinicUnitPayload): Promise<ClinicUnit> {
    const { data } = await api.post<ClinicUnit>("/unidades-clinica", payload);
    return data;
  },
};
