import type { Address } from "./Address";

export const MEDICAL_SPECIALITIES = [
  "ORTOPEDIA",
  "CARDIOLOGIA",
  "DERMATOLOGIA",
  "ENDOCRINOLOGIA",
  "GASTROENTEROLOGIA",
  "GERIATRIA",
  "HEMATOLOGIA",
  "INFECTOLOGIA",
  "NEUROLOGIA",
  "OFTALMOLOGIA",
  "ONCOLOGIA",
  "PEDIATRIA",
  "PNEUMOLOGIA",
  "GINECOLOGIA",
  "REUMATOLOGIA",
  "UROLOGIA",
  "PSICOLOGIA",
  "PSIQUIATRIA",
] as const;

export type MedicalSpeciality = (typeof MEDICAL_SPECIALITIES)[number];

export type Doctor = {
  id: string;
  name: string;
  cpf?: string;
  email?: string;
  phone?: string;
  crm: string;
  clinicUnitId?: string;
  speciality: MedicalSpeciality;
  address?: Address;
}

export type CreateDoctorPayload = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string;
  crm: string;
  clinicUnitId: string;
  speciality: MedicalSpeciality;
};

export type UpdateDoctorPayload = Partial<CreateDoctorPayload>;
