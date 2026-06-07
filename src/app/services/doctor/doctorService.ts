import { api } from "@/lib/api";
import {
  MEDICAL_SPECIALITIES,
  type Doctor,
  type MedicalSpeciality,
} from "@/types/Doctor";

type DoctorApiItem = Partial<Doctor> & {
  doctorId?: string;
  specialty?: MedicalSpeciality;
  medicalSpeciality?: MedicalSpeciality;
  user?: {
    name?: string;
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
  const speciality = MEDICAL_SPECIALITIES.find(
    (item) => item === value?.toUpperCase(),
  );

  return speciality ?? "CARDIOLOGIA";
}

function normalizeDoctor(doctor: DoctorApiItem): Doctor {
  return {
    id: doctor.id ?? doctor.doctorId ?? "",
    name: doctor.name ?? doctor.user?.name ?? "Medico",
    cpf: doctor.cpf,
    email: doctor.email ?? doctor.user?.email,
    phone: doctor.phone,
    crm: doctor.crm ?? "",
    speciality: normalizeSpeciality(
      doctor.speciality ?? doctor.specialty ?? doctor.medicalSpeciality,
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
  async findAll(): Promise<Doctor[]> {
    const { data } = await api.get<DoctorApiResponse>("/medicos");
    return normalizeDoctorsResponse(data);
  },

  async findById(id: string): Promise<Doctor> {
    const { data } = await api.get<DoctorApiItem>(`/medicos/${id}`);
    return normalizeDoctor(data);
  },
};
