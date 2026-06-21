import { Button } from "@/components/Button/Button";
import {
  MEDICAL_SPECIALITIES,
  type Doctor,
  type MedicalSpeciality,
} from "@/types/Doctor";
import type { FormEvent } from "react";

const AVAILABLE_TIMES = ["08:00", "09:00", "10:30", "14:00", "15:30", "16:30"];

const SPECIALITY_LABELS: Record<MedicalSpeciality, string> = {
  ORTOPEDIA: "Ortopedia",
  CARDIOLOGIA: "Cardiologia",
  DERMATOLOGIA: "Dermatologia",
  ENDOCRINOLOGIA: "Endocrinologia",
  GASTROENTEROLOGIA: "Gastroenterologia",
  GERIATRIA: "Geriatria",
  HEMATOLOGIA: "Hematologia",
  INFECTOLOGIA: "Infectologia",
  NEUROLOGIA: "Neurologia",
  OFTALMOLOGIA: "Oftalmologia",
  ONCOLOGIA: "Oncologia",
  PEDIATRIA: "Pediatria",
  PNEUMOLOGIA: "Pneumologia",
  GINECOLOGIA: "Ginecologia",
  REUMATOLOGIA: "Reumatologia",
  UROLOGIA: "Urologia",
  PSICOLOGIA: "Psicologia",
  PSIQUIATRIA: "Psiquiatria",
};

type ScheduleAppointmentFormProps = {
  doctors: Doctor[];
  isLoadingDoctors: boolean;
  isSubmitting: boolean;
  onSubmit: (data: {
    doctorId: string;
    date: string;
    time: string;
  }) => void;
  selectedSpeciality: string;
  selectedDoctorId: string;
  selectedDate: string;
  selectedTime: string;
  onSpecialityChange: (speciality: string) => void;
  onDoctorChange: (doctorId: string) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
};

export function ScheduleAppointmentForm({
  doctors,
  isLoadingDoctors,
  isSubmitting,
  onSubmit,
  selectedSpeciality,
  selectedDoctorId,
  selectedDate,
  selectedTime,
  onSpecialityChange,
  onDoctorChange,
  onDateChange,
  onTimeChange,
}: ScheduleAppointmentFormProps) {
  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      doctorId: selectedDoctorId,
      date: selectedDate,
      time: selectedTime,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-lg font-bold">1. Detalhes da consulta</h2>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Especialidade
          </label>

          <select
            value={selectedSpeciality}
            onChange={(event) =>
              onSpecialityChange(event.target.value as MedicalSpeciality)
            }
            required
            className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="">Selecione a especialidade</option>
            {MEDICAL_SPECIALITIES.map((speciality) => (
              <option key={speciality} value={speciality}>
                {SPECIALITY_LABELS[speciality]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Medico</label>

          <select
            value={selectedDoctorId}
            onChange={(event) => onDoctorChange(event.target.value)}
            required
            className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="">
              {isLoadingDoctors ? "Carregando medicos" : "Selecione o medico"}
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">Data</label>

            <input
              type="date"
              min={today}
              value={selectedDate}
              onChange={(event) => onDateChange(event.target.value)}
              required
              className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Horario disponivel
            </label>

            <select
              value={selectedTime}
              onChange={(event) => onTimeChange(event.target.value)}
              required
              className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Selecione o horario</option>
              {AVAILABLE_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          size="full"
          variant="primary"
        >
          {isSubmitting ? "Agendando..." : "Confirmar agendamento"}
        </Button>
      </div>
    </form>
  );
}
