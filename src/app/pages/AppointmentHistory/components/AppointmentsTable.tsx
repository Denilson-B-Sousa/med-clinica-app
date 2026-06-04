import type { Appointment } from "@/types/Appointment";
import type { Doctor } from "@/types/Doctor";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash } from "phosphor-react";
import { StatusBadge } from "./StatusBadge";

type AppointmentsTableProps = {
  appointments: Appointment[];
  doctors: Doctor[];
  cancellingAppointmentId?: string;
  onCancel: (appointmentId: string) => void;
};

function canCancel(appointment: Appointment) {
  return appointment.status === "SCHEDULED" || appointment.status === "CONFIRMED";
}

export function AppointmentsTable({
  appointments,
  doctors,
  cancellingAppointmentId,
  onCancel,
}: AppointmentsTableProps) {
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
          {appointments.map((appointment) => {
            const doctor = doctors.find(
              (currentDoctor) => currentDoctor.id === appointment.doctorId,
            );
            const appointmentDate = new Date(appointment.scheduleAt);

            return (
              <tr key={appointment.id}>
                <td className="px-6 py-5">
                  <strong>{format(appointmentDate, "dd/MM/yyyy")}</strong>
                  <p className="text-slate-500">
                    {format(appointmentDate, "EEEE", { locale: ptBR })}
                  </p>
                </td>

                <td className="px-6 py-5">
                  {format(appointmentDate, "HH:mm")}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/40?img=12"
                      alt={doctor?.name ?? "Médico"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">
                        {doctor?.name ?? "Médico não encontrado"}
                      </p>
                      {doctor?.crm && (
                        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-600">
                          CRM {doctor.crm}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">{doctor?.speciality ?? "—"}</td>

                <td className="px-6 py-5">
                  <strong>{doctor?.address.city ?? "—"}</strong>
                  <p className="text-slate-500">
                    {doctor
                      ? `${doctor.address.street}, ${doctor.address.number}`
                      : "—"}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={appointment.status} />
                </td>

                <td className="px-6 py-5">
                  {canCancel(appointment) ? (
                    <button
                      type="button"
                      onClick={() => onCancel(appointment.id)}
                      disabled={cancellingAppointmentId === appointment.id}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                    >
                      <Trash size={16} />
                      {cancellingAppointmentId === appointment.id
                        ? "Cancelando..."
                        : "Cancelar"}
                    </button>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
