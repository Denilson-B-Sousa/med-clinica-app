import { api } from "@/lib/api";
import {
  MEDICAL_SPECIALITIES,
  type CreateDoctorPayload,
  type Doctor,
  type MedicalSpeciality,
  type UpdateDoctorPayload,
} from "@/types/Doctor";

type DoctorApiItem = Partial<Doctor> & {
  doctorId?: string;
  idDoctor?: string;
  idMedico?: string;
  nome?: string;
  telefone?: string;
  especialidade?: string;
  specialty?: MedicalSpeciality;
  medicalSpeciality?: MedicalSpeciality;
  clinicUnitId?: string;
  unidadeClinicaId?: string;
  unitId?: string;
  user?: {
    id?: string;
    name?: string;
    nome?: string;
    email?: string;
  };
};

type DoctorApiResponse =
  | DoctorApiItem[]
  | {
      content?: DoctorApiItem[];
      data?: DoctorApiItem[];
      items?: DoctorApiItem[];
    };

function normalizeSpeciality(value?: string): MedicalSpeciality {
  const normalizedValue = value
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  const speciality = MEDICAL_SPECIALITIES.find(
    (item) => item === normalizedValue,
  );

  return speciality ?? "CARDIOLOGIA";
}

function normalizeDoctor(doctor: DoctorApiItem): Doctor {
  return {
    id: doctor.doctorId ?? doctor.idDoctor ?? doctor.idMedico ?? doctor.id ?? doctor.user?.id ?? "",
    name: doctor.name ?? doctor.nome ?? doctor.user?.name ?? doctor.user?.nome ?? "Medico",
    cpf: doctor.cpf,
    email: doctor.email ?? doctor.user?.email,
    phone: doctor.phone ?? doctor.telefone,
    crm: doctor.crm ?? "",
    clinicUnitId: doctor.clinicUnitId ?? doctor.unidadeClinicaId ?? doctor.unitId,
    speciality: normalizeSpeciality(
      doctor.speciality ??
        doctor.specialty ??
        doctor.medicalSpeciality ??
        doctor.especialidade,
    ),
    address: doctor.address,
  };
}

function normalizeDoctorsResponse(data: DoctorApiResponse): Doctor[] {
  const doctors = Array.isArray(data)
    ? data
    : data.content ?? data.data ?? data.items ?? [];

  return doctors.map(normalizeDoctor).filter((doctor) => doctor.id);
}

export const doctorService = {
  async findAll(speciality?: MedicalSpeciality): Promise<Doctor[]> {
    const { data } = await api.get<DoctorApiResponse>("/medicos", {
      params: {
        speciality,
      },
    });

    return normalizeDoctorsResponse(data);
  },

  async findById(id: string): Promise<Doctor> {
    const { data } = await api.get<DoctorApiItem>(`/medicos/${id}`);
    return normalizeDoctor(data);
  },

  async create(payload: CreateDoctorPayload): Promise<Doctor> {
    const { data } = await api.post<DoctorApiItem>("/medicos", payload);
    return normalizeDoctor(data);
  },

  async update(id: string, payload: UpdateDoctorPayload): Promise<Doctor> {
    const { data } = await api.put<DoctorApiItem>(`/medicos/${id}`, payload);
    return normalizeDoctor(data);
  },
};
