import { useConfirmAttendance } from "@/hooks/appointment/useConfirmAttendance";
import { useCancelAppointment } from "@/hooks/appointment/useCancelAppointment";
import type { AppointmentHistoryItem } from "@/types/Appointment";
import { CheckCircle, MapPin, Trash, X } from "phosphor-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../Button/Button";
import { AxiosError } from "axios";
import { getAppointmentApiErrorMessage, type ApiErrorResponse } from "@/utils/appointmentApiError";

type DoctorCardProps = {
  appointment: AppointmentHistoryItem;
};

export function DoctorCard({ appointment }: DoctorCardProps) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState(false);
  const { doctor } = appointment;
  const clinicUnit = appointment.clinicUnit;
  const address = clinicUnit?.address ?? doctor.address;
  const isConfirmed = appointment.attendanceConfirmed === true;
  const cancelAppointment = useCancelAppointment();
  const confirmAttendance = useConfirmAttendance();

  async function handleConfirmAttendance() {
    try {
      await confirmAttendance.mutateAsync(appointment.id);
      setIsConfirmationModalOpen(false);
      toast.success("Presenca confirmada com sucesso.");
    } catch {
      toast.error("Não foi possível confirmar a presença.");
    }
  }

  async function handleCancel() {
    try {
      await cancelAppointment.mutateAsync({ id: appointment.id });
      toast.success("Consulta excluída com sucesso.");
    } catch (error) {
      const response = (error as AxiosError<ApiErrorResponse>).response?.data;
      toast.error(getAppointmentApiErrorMessage(response, "Não foi possível cancelar a consulta."));
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

          <p>{address ? `${address.street}, ${address.number}` : "-"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          type="button"
          size="lg"
          disabled={isConfirmed || confirmAttendance.isPending}
          onClick={() => setIsConfirmationModalOpen(true)}
          primary={!isConfirmed}
          className={
            isConfirmed
              ? "bg-emerald-600 text-white hover:bg-emerald-600 disabled:bg-emerald-600"
              : undefined
          }
        >
          <CheckCircle size={24} />
          {isConfirmed
            ? "Presenca confirmada"
            : confirmAttendance.isPending
              ? "Confirmando..."
              : "Confirmar presença"}
        </Button>

        {!isConfirmed && (
          <Button
            type="button"
            error
            size="lg"
            disabled={cancelAppointment.isPending}
            onClick={handleCancel}
          >
            <Trash size={24} />
            {cancelAppointment.isPending ? "Excluindo..." : "Excluir consulta"}
          </Button>
        )}
      </div>

      {isConfirmationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Confirmar presença?
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Você confirma que deseja manter sua consulta com{" "}
                  <strong>{doctor.name}</strong>? Depois disso, ela não poderá
                  ser cancelada nem reagendada.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsConfirmationModalOpen(false)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100"
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsConfirmationModalOpen(false)}
                className="h-11 cursor-pointer rounded-md px-5 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={handleConfirmAttendance}
                disabled={confirmAttendance.isPending}
                className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                <CheckCircle size={16} />
                {confirmAttendance.isPending
                  ? "Confirmando..."
                  : "Sim, confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
