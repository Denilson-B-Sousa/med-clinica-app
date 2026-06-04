import type { AppointmentHistoryItem } from "../constants/appointments";
import { StatusBadge } from "./StatusBadge";

type AppointmentsTableProps = {
  appointments: AppointmentHistoryItem[];
};

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full border-collapse text-left">
        <thead className="bg-slate-50 text-sm text-slate-600">
          <tr>
            <th className="px-6 py-4">Data</th>
            <th className="px-6 py-4">Horário</th>
            <th className="px-6 py-4">Médico</th>
            <th className="px-6 py-4">Especialidade</th>
            <th className="px-6 py-4">Local</th>
            <th className="px-6 py-4">Situação</th>
            <th className="px-6 py-4">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 text-sm">
          {appointments.map((appointment) => (
            <tr key={`${appointment.date}-${appointment.time}`}>
              <td className="px-6 py-5">
                <strong>{appointment.date}</strong>
                <p className="text-slate-500">{appointment.weekday}</p>
              </td>

              <td className="px-6 py-5">{appointment.time}</td>

              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <img
                    src={appointment.doctorImage}
                    alt="Médica"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{appointment.doctorName}</p>
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-600">
                      {appointment.crm}
                    </span>
                  </div>
                </div>
              </td>

              <td className="px-6 py-5">{appointment.specialty}</td>

              <td className="px-6 py-5">
                <strong>{appointment.city}</strong>
                <p className="text-slate-500">{appointment.address}</p>
              </td>

              <td className="px-6 py-5">
                <StatusBadge status={appointment.status} />
              </td>

              <td className="px-6 py-5">
                <button className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50">
                  Ver detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
