import { DotsThreeVertical, Trash, X } from "phosphor-react";
import { AdminStatusBadge } from "./AdminStatusBadge";
import type { AdminAppointmentRow } from "../types";
import { useState } from "react";

type AppointmentsManagementTableProps = {
  appointments: AdminAppointmentRow[];
  currentPage: number;
  pageSize: number;
  total: number;
  isLoading?: boolean;
  deletingAppointmentId?: string;
  onPageChange?: (page: number) => void;
  onDeleteAppointment?: (appointmentId: string) => void;
};

export function AppointmentsManagementTable({
  appointments,
  currentPage,
  pageSize,
  total,
  isLoading,
  deletingAppointmentId,
  onPageChange,
  onDeleteAppointment,
}: AppointmentsManagementTableProps) {
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<AdminAppointmentRow | null>(null);
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  function handleConfirmDelete() {
    if (!appointmentToDelete) {
      return;
    }

    onDeleteAppointment?.(appointmentToDelete.id);
    setAppointmentToDelete(null);
  }

  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white">
      <div className="px-4 py-4">
        <h3 className="text-base font-bold text-[#0B1F4D]">
          Consultas agendadas
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left">
          <thead className="bg-slate-50 text-xs font-bold text-[#20375F]">
            <tr>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Horario</th>
              <th className="px-4 py-3">Unidade</th>
              <th className="px-4 py-3">Medico</th>
              <th className="px-4 py-3">Paciente</th>
              <th className="px-4 py-3">Especialidade</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Acoes</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-sm text-[#20375F]">
            {isLoading && (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={8}>
                  Carregando consultas...
                </td>
              </tr>
            )}

            {!isLoading && appointments.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={8}>
                  Nenhuma consulta encontrada para os filtros selecionados.
                </td>
              </tr>
            )}

            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">{appointment.date}</td>
                <td className="px-4 py-3">{appointment.time}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold">
                    {appointment.clinicUnitName}
                  </span>
                  <small className="mt-1 block text-xs text-slate-500">
                    {appointment.clinicUnitAddress}
                  </small>
                </td>
                <td className="px-4 py-3">{appointment.doctorName}</td>
                <td className="px-4 py-3">{appointment.patientName}</td>
                <td className="px-4 py-3">{appointment.speciality}</td>
                <td className="px-4 py-3">
                  <AdminStatusBadge
                    type="appointment"
                    status={appointment.status}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={
                        deletingAppointmentId === appointment.id
                      }
                      onClick={() => setAppointmentToDelete(appointment)}
                      className="flex h-9 min-w-36 cursor-pointer items-center justify-center gap-2 rounded-md border border-red-300 px-3 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      <Trash size={14} />
                      {deletingAppointmentId === appointment.id
                        ? "Excluindo..."
                        : "Excluir"}
                    </button>

                    <button
                      type="button"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[#20375F] transition hover:bg-slate-100"
                      aria-label="Mais opcoes"
                    >
                      <DotsThreeVertical size={22} weight="bold" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 px-4 py-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Mostrando {start} a {end} de {total} consultas
        </p>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange?.(page)}
              className={`h-9 w-9 cursor-pointer rounded-md border text-sm font-semibold ${
                page === currentPage
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {appointmentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#0B1F4D]">
                  Excluir consulta?
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Esta acao removera a consulta de{" "}
                  <strong>{appointmentToDelete.patientName}</strong> com{" "}
                  <strong>{appointmentToDelete.doctorName}</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAppointmentToDelete(null)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100"
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setAppointmentToDelete(null)}
                className="h-11 cursor-pointer rounded-md px-5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <Trash size={16} />
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
