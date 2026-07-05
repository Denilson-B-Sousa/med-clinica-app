import { Button } from "@/components/Button/Button";
import type { AppointmentHistoryItem } from "@/types/Appointment";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Trash, X } from "phosphor-react";
import { useState } from "react";
import { StatusBadge } from "./StatusBadge";

type AppointmentsTableProps = {
  appointments: AppointmentHistoryItem[];
  cancellingAppointmentId?: string;
  deletingAppointmentId?: string;
  onCancel: (appointmentId: string) => void;
  onDelete: (appointmentId: string) => void;
};

function canCancel(appointment: AppointmentHistoryItem) {
  if (appointment.attendanceConfirmed) {
    return false;
  }

  return appointment.status === "SCHEDULED" || appointment.status === "CONFIRMED";
}

function canReschedule(appointment: AppointmentHistoryItem) {
  if (appointment.attendanceConfirmed) {
    return false;
  }

  return appointment.status === "SCHEDULED" || appointment.status === "CONFIRMED";
}

function getDoctorInfo(appointment: AppointmentHistoryItem) {
  const doctor = appointment.doctor;
  const address = doctor?.address;

  return {
    name: doctor?.name,
    crm: doctor?.crm,
    speciality: doctor?.speciality,
    city: address?.city,
    street: address?.street,
    number: address?.number,
  };
}

function getAppointmentLocation(appointment: AppointmentHistoryItem) {
  const clinicUnit = appointment.clinicUnit;
  const fallbackAddress = appointment.doctor?.address;
  const address = clinicUnit?.address ?? fallbackAddress;

  return {
    name: clinicUnit?.name ?? address?.city ?? "-",
    address: [address?.street, address?.number].filter(Boolean).join(", "),
  };
}

export function AppointmentsTable({
  appointments,
  cancellingAppointmentId,
  deletingAppointmentId,
  onCancel,
  onDelete,
}: AppointmentsTableProps) {
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<AppointmentHistoryItem | null>(null);

  function handleConfirmDelete() {
    if (!appointmentToDelete) return;

    onDelete(appointmentToDelete.id);
    setAppointmentToDelete(null);
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[1040px] border-collapse text-left">
        <thead className="bg-slate-50 text-sm text-slate-600">
          <tr>
            <th className="px-5 py-4">Data</th>
            <th className="px-5 py-4">Horário</th>
            <th className="px-5 py-4">Médico</th>
            <th className="px-5 py-4">Especialidade</th>
            <th className="px-5 py-4">Local</th>
            <th className="px-5 py-4">Situacao</th>
            <th className="w-72 px-5 py-4">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 text-sm">
          {appointments.map((appointment) => {
            const doctor = getDoctorInfo(appointment);
            const location = getAppointmentLocation(appointment);
            const appointmentDate = new Date(appointment.scheduleAt);

            return (
              <tr key={appointment.id}>
                <td className="px-5 py-4 align-middle">
                  <strong>{format(appointmentDate, "dd/MM/yyyy")}</strong>
                  <p className="text-slate-500">
                    {format(appointmentDate, "EEEE", { locale: ptBR })}
                  </p>
                </td>

                <td className="px-5 py-4 align-middle">
                  {format(appointmentDate, "HH:mm")}
                </td>

                <td className="px-5 py-4 align-middle">
                  <div className="max-w-56">
                    <p className="font-semibold leading-snug">
                        {doctor.name ?? "Médico não encontrado"}
                    </p>
                    {doctor.crm && (
                      <span className="mt-2 inline-block max-w-full break-words rounded bg-blue-100 px-2 py-1 text-xs font-bold leading-snug text-blue-600">
                        CRM {doctor.crm}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-5 py-4 align-middle">
                  {doctor.speciality ?? "-"}
                </td>

                <td className="px-5 py-4 align-middle">
                  <strong>{location.name}</strong>
                  <p className="text-slate-500">{location.address || "-"}</p>
                </td>

                <td className="px-5 py-4 align-middle">
                  <StatusBadge status={appointment.status} />
                </td>

                <td className="px-5 py-4 align-middle">
                  {canReschedule(appointment) || canCancel(appointment) || appointment.canDelete ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {canReschedule(appointment) && (
                        <Button
                          to={`/reagendar-consulta/${appointment.id}`}
                          size="action"
                          variant="blueOutline"
                        >
                          <Calendar size={16} />
                          Reagendar
                        </Button>
                      )}

                      {canCancel(appointment) && (
                        <Button
                          type="button"
                          onClick={() => onCancel(appointment.id)}
                          disabled={cancellingAppointmentId === appointment.id}
                          size="action"
                          variant="dangerOutline"
                        >
                          <Trash size={16} />
                          {cancellingAppointmentId === appointment.id
                            ? "Cancelando..."
                            : "Cancelar"}
                        </Button>
                      )}

                      {appointment.canDelete && (
                        <Button
                          type="button"
                          onClick={() => setAppointmentToDelete(appointment)}
                          disabled={deletingAppointmentId === appointment.id}
                          size="action"
                          variant="dangerOutline"
                        >
                          <Trash size={16} />
                          {deletingAppointmentId === appointment.id
                            ? "Excluindo..."
                            : "Excluir"}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {appointmentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#0B1F4D]">
                  Excluir do histórico?
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Esta ação removerá permanentemente esta consulta do seu histórico.
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
