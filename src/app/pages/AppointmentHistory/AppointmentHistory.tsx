import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { useAppointments } from "@/hooks/appointment/useAppoinments";
import { useCancelAppointment } from "@/hooks/appointment/useCancelAppointment";
import { useDoctors } from "@/hooks/doctor/useDoctors";
import { toast } from "sonner";
import {
  AppointmentFilters,
  AppointmentPagination,
  AppointmentsTable,
} from "./components";

export function AppointmentHistory() {
  const [cancellingAppointmentId, setCancellingAppointmentId] = useState("");
  const { data: appointments = [], isLoading } = useAppointments();
  const { data: doctors = [] } = useDoctors();
  const cancelAppointment = useCancelAppointment();

  async function handleCancel(appointmentId: string) {
    setCancellingAppointmentId(appointmentId);

    try {
      await cancelAppointment.mutateAsync(appointmentId);
      toast.success("Consulta cancelada com sucesso.");
    } catch {
      toast.error("Não foi possível cancelar a consulta.");
    } finally {
      setCancellingAppointmentId("");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-8">
      <BackLink to="/home" />

      <PageHeader
        title="Histórico de consultas"
        description="Veja aqui todas as suas consultas realizadas e agendadas."
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <AppointmentFilters />

        {isLoading && <p className="py-8 text-slate-500">Carregando...</p>}

        {!isLoading && appointments.length === 0 && (
          <EmptyState
            title="Nenhuma consulta encontrada"
            description="Assim que você agendar uma consulta, ela aparecerá aqui."
          />
        )}

        {!isLoading && appointments.length > 0 && (
          <>
            <AppointmentsTable
              appointments={appointments}
              doctors={doctors}
              cancellingAppointmentId={cancellingAppointmentId}
              onCancel={handleCancel}
            />
            <AppointmentPagination total={appointments.length} />
          </>
        )}
      </div>
    </section>
  );
}
