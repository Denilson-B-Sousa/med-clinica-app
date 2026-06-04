import type { Appointment } from "@/types/Appointment";
import type { Doctor } from "@/types/Doctor";
import { getAppointmentTime } from "@/utils/date/DateTimeFormatter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash } from "phosphor-react";

type CurrentAppointmentCardProps = {
  appointment: Appointment;
  doctor?: Doctor;
  isCancelling: boolean;
  onCancel: () => void;
};

export function CurrentAppointmentCard({
  appointment,
  doctor,
  isCancelling,
  onCancel,
}: CurrentAppointmentCardProps) {
  const date = format(new Date(appointment.scheduleAt), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-lg font-bold">1. Consulta atual</h2>

      <div className="space-y-6 rounded-2xl bg-slate-50 p-6">
        <div>
          <p className="text-sm font-bold">Data</p>
          <p className="text-slate-600">{date}</p>
        </div>

        <div>
          <p className="text-sm font-bold">Horário</p>
          <p className="text-slate-600">
            {getAppointmentTime(appointment.scheduleAt)}
          </p>
        </div>

        <div>
          <p className="text-sm font-bold">Médico</p>
          <p className="font-semibold">{doctor?.name ?? "Carregando..."}</p>
          <p className="text-sm uppercase text-slate-600">
            {doctor?.speciality ?? "—"}
          </p>
        </div>

        <div>
          <p className="text-sm font-bold">Local</p>
          <p className="font-semibold">{doctor?.address.city ?? "—"}</p>
          <p className="text-sm text-slate-600">
            {doctor
              ? `${doctor.address.street}, ${doctor.address.number}`
              : "Carregando..."}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onCancel}
        disabled={isCancelling}
        className="mt-8 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-500 font-bold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400"
      >
        <Trash /> {isCancelling ? "Cancelando..." : "Cancelar consulta"}
      </button>
    </aside>
  );
}
