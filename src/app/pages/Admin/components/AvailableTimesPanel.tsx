import { CalendarBlank } from "phosphor-react";
import { Link } from "react-router-dom";
import type {
  AdminAvailableTimes,
  AdminClinicUnitOption,
  AdminDoctorOption,
} from "../types";

type AvailableTimesPanelProps = {
  schedule: AdminAvailableTimes;
  clinicUnits: AdminClinicUnitOption[];
  doctors: AdminDoctorOption[];
  selectedClinicUnitId?: string;
  selectedSpeciality?: string;
  onClinicUnitChange?: (clinicUnitId: string) => void;
  onSpecialityChange?: (speciality: string) => void;
  onDoctorChange?: (doctorId: string) => void;
  onDateChange?: (date: string) => void;
  onPeriodChange?: (period: AdminAvailableTimes["selectedPeriod"]) => void;
};

export function AvailableTimesPanel({
  schedule,
  clinicUnits,
  doctors,
  selectedClinicUnitId = schedule.clinicUnitId,
  selectedSpeciality = "Cardiologia",
  onClinicUnitChange,
  onSpecialityChange,
  onDoctorChange,
  onDateChange,
  onPeriodChange,
}: AvailableTimesPanelProps) {
  const activeDoctors = doctors.filter((doctor) => doctor.status === "ACTIVE");
  const doctorsByUnit = activeDoctors.filter(
    (doctor) => doctor.clinicUnitId === selectedClinicUnitId,
  );
  const specialities = Array.from(
    new Set(doctorsByUnit.map((doctor) => doctor.speciality)),
  );
  const doctorsBySpeciality = doctorsByUnit.filter(
    (doctor) => doctor.speciality === selectedSpeciality,
  );

  return (
    <aside className="min-w-0 bg-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-3">
          <CalendarBlank className="text-[#20375F]" size={20} weight="bold" />
          <div>
            <h3 className="text-base font-bold text-[#0B1F4D]">
              Horarios disponiveis
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Consulte por medico, data e periodo.
            </p>
          </div>
        </div>

        <Link
          to="/administracao/agenda"
          className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-blue-300 px-4 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
        >
          <CalendarBlank size={18} weight="bold" />
          Ver agenda completa
        </Link>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[240px_240px_1fr_220px_180px]">
        <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
          Unidade
          <select
            value={selectedClinicUnitId}
            onChange={(event) => onClinicUnitChange?.(event.target.value)}
            className="h-11 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            {clinicUnits.map((clinicUnit) => (
              <option key={clinicUnit.id} value={clinicUnit.id}>
                {clinicUnit.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
          Especialidade
          <select
            value={selectedSpeciality}
            onChange={(event) => onSpecialityChange?.(event.target.value)}
            className="h-11 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            {specialities.map((speciality) => (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
          Medico
          <select
            value={schedule.doctorId}
            onChange={(event) => onDoctorChange?.(event.target.value)}
            className="h-11 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            {doctorsBySpeciality.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
          Data
          <input
            type="date"
            value={schedule.selectedDate}
            onChange={(event) => onDateChange?.(event.target.value)}
            className="h-11 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
          Periodo
          <select
            value={schedule.selectedPeriod}
            onChange={(event) =>
              onPeriodChange?.(
                event.target.value as AdminAvailableTimes["selectedPeriod"],
              )
            }
            className="h-11 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="DAY">Dia</option>
            <option value="MORNING">Manha</option>
            <option value="AFTERNOON">Tarde</option>
            <option value="EVENING">Noite</option>
          </select>
        </label>
      </div>

      <div className="mt-5">
        <strong className="block text-sm text-[#20375F]">
          {schedule.doctorName}
        </strong>
        <p className="mt-2 text-sm text-slate-600">
          {schedule.clinicUnitName} - {schedule.dateLabel}
        </p>
      </div>

      <div className="mt-4 grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10">
        {schedule.times.map((time) => (
          <button
            key={time}
            type="button"
            className="h-10 min-w-0 cursor-pointer rounded-md border border-blue-200 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
          >
            {time}
          </button>
        ))}
      </div>

    </aside>
  );
}
