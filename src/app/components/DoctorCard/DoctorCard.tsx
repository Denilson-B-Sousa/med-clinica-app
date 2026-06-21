import { useCancelAppointment } from "@/hooks/appointment/useCancelAppointment";
import type { AppointmentHistoryItem } from "@/types/Appointment";
import { CheckCircle, MapPin, Trash } from "phosphor-react";
import { toast } from "sonner";
import { Button } from "../Button/Button";

type DoctorCardProps = {
  appointment: AppointmentHistoryItem;
};

export function DoctorCard({ appointment }: DoctorCardProps) {
  const { doctor } = appointment;
  const clinicUnit = appointment.clinicUnit;
  const address = clinicUnit?.address ?? doctor.address;
  const cancelAppointment = useCancelAppointment();

  async function handleCancel() {
    try {
      await cancelAppointment.mutateAsync(appointment.id);
      toast.success("Consulta cancelada com sucesso.");
    } catch {
      toast.error("Não foi possível cancelar a consulta.");
    }
  }

  return (
    <div className="flex flex-col justify-between space-y-6 rounded-xl bg-white p-8">
      <div className="flex items-start">
        <div className="flex min-w-0 flex-col">
          <h2 className="text-3xl font-semibold text-slate-900">
            {doctor.name}
          </h2>

          <span className="mt-1 text-lg text-slate-600">
            {doctor.speciality}
          </span>

          <small className="mt-3 w-fit rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            CRM {doctor.crm}
          </small>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3">
        <MapPin size={32} className="mt-1 text-slate-500" />

        <div>
          <h4 className="text-lg font-semibold text-slate-900">
            {clinicUnit?.name ?? address?.city ?? "-"}
          </h4>

          <p>
            {address ? `${address.street}, ${address.number}` : "-"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button primary size="lg">
          <CheckCircle size={24} />
          Confirmar presença
        </Button>

        <Button
          type="button"
          error
          size="lg"
          disabled={cancelAppointment.isPending}
          onClick={handleCancel}
        >
          <Trash size={24} />
          {cancelAppointment.isPending ? "Cancelando..." : "Cancelar"}
        </Button>
      </div>
    </div>
  );
}
