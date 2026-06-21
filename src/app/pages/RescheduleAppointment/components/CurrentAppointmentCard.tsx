import { Button } from "@/components/Button/Button";
import type { AppointmentHistoryItem } from "@/types/Appointment";
import { getAppointmentTime } from "@/utils/date/DateTimeFormatter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash } from "phosphor-react";

type CurrentAppointmentCardProps = {
  appointment: AppointmentHistoryItem;
  isCancelling: boolean;
  onCancel: () => void;
};

export function CurrentAppointmentCard({
  appointment,
  isCancelling,
  onCancel,
}: CurrentAppointmentCardProps) {
  const { doctor } = appointment;
  const clinicUnit = appointment.clinicUnit;
  const address = clinicUnit?.address ?? doctor.address;
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
          <p className="font-semibold">{doctor.name}</p>
          <p className="text-sm uppercase text-slate-600">
            {doctor.speciality}
          </p>
        </div>

        <div>
          <p className="text-sm font-bold">Local</p>
          <p className="font-semibold">
            {clinicUnit?.name ?? address?.city ?? "-"}
          </p>
          <p className="text-sm text-slate-600">
            {address ? `${address.street}, ${address.number}` : "-"}
          </p>
        </div>
      </div>

      <Button
        type="button"
        onClick={onCancel}
        disabled={isCancelling}
        size="full"
        variant="dangerOutline"
        className="mt-8 border-red-500 font-bold text-red-500"
      >
        <Trash /> {isCancelling ? "Cancelando..." : "Cancelar consulta"}
      </Button>
    </aside>
  );
}
