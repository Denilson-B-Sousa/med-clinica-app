import { DotsThreeVertical, X } from "phosphor-react";
import { AdminStatusBadge } from "./AdminStatusBadge";
import type { AdminAppointmentRow } from "../types";

type AppointmentsManagementTableProps = {
  appointments: AdminAppointmentRow[];
  onCancelAppointment?: (appointmentId: string) => void;
};

function getCancelLabel(appointment: AdminAppointmentRow) {
  if (appointment.status === "COMPLETED") {
    return "Nao pode cancelar";
  }

  if (appointment.status === "CANCELED") {
    return "Ja cancelada";
  }

  return "Cancelar";
}

export function AppointmentsManagementTable({
  appointments,
  onCancelAppointment,
}: AppointmentsManagementTableProps) {
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
              <th className="px-4 py-3">Medico</th>
              <th className="px-4 py-3">Paciente</th>
              <th className="px-4 py-3">Especialidade</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Acoes</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-sm text-[#20375F]">
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">{appointment.date}</td>
                <td className="px-4 py-3">{appointment.time}</td>
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
                      disabled={!appointment.canCancel}
                      onClick={() => onCancelAppointment?.(appointment.id)}
                      className="flex h-9 min-w-36 cursor-pointer items-center justify-center gap-2 rounded-md border border-red-300 px-3 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      {appointment.canCancel && <X size={14} />}
                      {getCancelLabel(appointment)}
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
        <p>Mostrando 1 a 5 de 24 consultas</p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              className={`h-9 w-9 cursor-pointer rounded-md border text-sm font-semibold ${
                page === 1
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
