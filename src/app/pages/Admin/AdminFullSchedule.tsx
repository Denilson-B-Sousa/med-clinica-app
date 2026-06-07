import { Link } from "react-router-dom";
import { ArrowLeft, CalendarBlank, Funnel, X } from "phosphor-react";
import { AdminHeader, AppointmentsManagementTable } from "./components";
import {
  adminAppointments,
  adminDoctorOptions,
  adminScheduleSlots,
  availableTimes,
} from "./data";
import type { AdminScheduleSlotStatus } from "./types";

const slotStatusClasses: Record<AdminScheduleSlotStatus, string> = {
  AVAILABLE: "border-emerald-200 bg-emerald-50 text-emerald-700",
  SCHEDULED: "border-blue-200 bg-blue-50 text-blue-700",
  COMPLETED: "border-slate-200 bg-slate-100 text-slate-600",
  CANCELED: "border-red-200 bg-red-50 text-red-700",
};

const slotStatusLabels: Record<AdminScheduleSlotStatus, string> = {
  AVAILABLE: "Livre",
  SCHEDULED: "Agendada",
  COMPLETED: "Realizada",
  CANCELED: "Cancelada",
};

function handlePendingAction() {
  return undefined;
}

export function AdminFullSchedule() {
  const activeDoctors = adminDoctorOptions.filter(
    (doctor) => doctor.status === "ACTIVE",
  );
  const specialities = Array.from(
    new Set(activeDoctors.map((doctor) => doctor.speciality)),
  );
  const selectedSpeciality = "Cardiologia";
  const doctorsBySpeciality = activeDoctors.filter(
    (doctor) => doctor.speciality === selectedSpeciality,
  );

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1560px]">
        <AdminHeader />

        <div className="mt-6">
          <Link
            to="/admin"
            className="inline-flex cursor-pointer items-center gap-2 rounded-md px-1 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
          >
            <ArrowLeft size={18} weight="bold" />
            Voltar para area administrativa
          </Link>
        </div>

        <section className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-center gap-3">
              <CalendarBlank
                className="text-[#20375F]"
                size={24}
                weight="bold"
              />
              <div>
                <h1 className="text-2xl font-bold text-[#0B1F4D]">
                  Agenda completa
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Visualize horarios livres, ocupados, realizados e cancelados
                  por medico.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[220px_1fr_220px_180px_180px_auto_auto] lg:items-end">
            <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
              Especialidade
              <select
                defaultValue={selectedSpeciality}
                className="h-12 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                defaultValue={availableTimes.doctorId}
                className="h-12 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                defaultValue={availableTimes.selectedDate}
                className="h-12 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
              Visao
              <select className="h-12 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option>Dia</option>
                <option>Semana</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
              Status
              <select className="h-12 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option>Todos</option>
                <option>Livre</option>
                <option>Agendada</option>
                <option>Realizada</option>
                <option>Cancelada</option>
              </select>
            </label>

            <button
              type="button"
              onClick={handlePendingAction}
              className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              <Funnel size={18} />
              Filtrar
            </button>

            <button
              type="button"
              onClick={handlePendingAction}
              className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              <X size={16} />
              Limpar
            </button>
          </div>
        </section>

        <section className="mt-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0B1F4D]">
                {availableTimes.doctorName}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {availableTimes.dateLabel}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-md bg-emerald-50 px-3 py-1 text-emerald-700">
                Livre
              </span>
              <span className="rounded-md bg-blue-50 px-3 py-1 text-blue-700">
                Agendada
              </span>
              <span className="rounded-md bg-slate-100 px-3 py-1 text-slate-600">
                Realizada
              </span>
              <span className="rounded-md bg-red-50 px-3 py-1 text-red-700">
                Cancelada
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {adminScheduleSlots.map((slot) => (
              <article
                key={slot.id}
                className={`min-h-28 rounded-lg border p-4 ${slotStatusClasses[slot.status]}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <strong className="text-2xl leading-none">{slot.time}</strong>
                  <span className="rounded-md bg-white/70 px-2 py-1 text-xs font-bold uppercase">
                    {slotStatusLabels[slot.status]}
                  </span>
                </div>

                <p className="mt-4 min-h-5 text-sm font-semibold">
                  {slot.patientName ?? "Horario disponivel"}
                </p>

                {slot.status === "SCHEDULED" && (
                  <button
                    type="button"
                    disabled={!slot.canCancel}
                    onClick={handlePendingAction}
                    className="mt-3 h-9 cursor-pointer rounded-md border border-red-300 bg-white px-4 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                  >
                    Cancelar
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-[#0B1F4D]">
            Consultas do medico selecionado
          </h2>

          <div className="mt-5">
            <AppointmentsManagementTable
              appointments={adminAppointments}
              onCancelAppointment={handlePendingAction}
            />
          </div>
        </section>
      </div>
    </section>
  );
}
