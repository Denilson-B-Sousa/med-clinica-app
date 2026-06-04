import type { FormEvent } from "react";
import type { Doctor, MedicalSpeciality } from "@/types/Doctor";

const AVAILABLE_TIMES = ["08:00", "09:00", "10:30", "14:00", "15:30", "16:30"];

type ScheduleAppointmentFormProps = {
  doctors: Doctor[];
  isLoadingDoctors: boolean;
  isSubmitting: boolean;
  onSubmit: (data: {
    doctorId: string;
    date: string;
    time: string;
    notes: string;
  }) => void;
  selectedSpeciality: string;
  selectedDoctorId: string;
  selectedDate: string;
  selectedTime: string;
  notes: string;
  onSpecialityChange: (speciality: string) => void;
  onDoctorChange: (doctorId: string) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onNotesChange: (notes: string) => void;
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
  notes,
  onSpecialityChange,
  onDoctorChange,
  onDateChange,
  onTimeChange,
  onNotesChange,
}: ScheduleAppointmentFormProps) {
  const specialities = Array.from(
    new Set(doctors.map((doctor) => doctor.speciality)),
  );

  const filteredDoctors = selectedSpeciality
    ? doctors.filter((doctor) => doctor.speciality === selectedSpeciality)
    : doctors;

  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      doctorId: selectedDoctorId,
      date: selectedDate,
      time: selectedTime,
      notes,
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
            disabled={isLoadingDoctors}
            required
            className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="">Selecione a especialidade</option>
            {specialities.map((speciality) => (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Médico</label>

          <select
            value={selectedDoctorId}
            onChange={(event) => onDoctorChange(event.target.value)}
            disabled={isLoadingDoctors || !selectedSpeciality}
            required
            className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="">Selecione o médico</option>
            {filteredDoctors.map((doctor) => (
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
              Horário disponível
            </label>

            <select
              value={selectedTime}
              onChange={(event) => onTimeChange(event.target.value)}
              required
              className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Selecione o horário</option>
              {AVAILABLE_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Observações
          </label>

          <textarea
            rows={5}
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
            className="w-full resize-none rounded-lg border border-slate-300 p-4 text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="Conte-nos o motivo da consulta ou outras informações importantes."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#0094CB] font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Agendando..." : "Confirmar agendamento"}
        </button>
      </div>
    </form>
  );
}
