import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { useCancelAppointment } from "@/hooks/appointment/useCancelAppointment";
import { useNextAppointment } from "@/hooks/appointment/useNextAppointment";
import { useUpdateAppointment } from "@/hooks/appointment/useUpdateAppointment";
import { useDoctor } from "@/hooks/doctor/useDoctor";
import { toast } from "sonner";
import { CurrentAppointmentCard, RescheduleForm } from "./components";

export function RescheduleAppointment() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { data: appointment, isLoading } = useNextAppointment();
  const { data: doctor } = useDoctor(appointment?.doctorId ?? "");
  const updateAppointment = useUpdateAppointment();
  const cancelAppointment = useCancelAppointment();

  async function handleReschedule() {
    if (!appointment) {
      return;
    }

    try {
      await updateAppointment.mutateAsync({
        id: appointment.id,
        data: {
          scheduleAt: `${date}T${time}:00`,
        },
      });

      setDate("");
      setTime("");
      toast.success("Consulta reagendada com sucesso.");
    } catch {
      toast.error("Não foi possível reagendar a consulta.");
    }
  }

  async function handleCancel() {
    if (!appointment) {
      return;
    }

    try {
      await cancelAppointment.mutateAsync(appointment.id);
      toast.success("Consulta cancelada com sucesso.");
    } catch {
      toast.error("Não foi possível cancelar a consulta.");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-8">
      <div className="mb-5">
        <BackLink to="/home" />
      </div>

      <PageHeader
        title="Reagendar consulta"
        description="Escolha uma nova data e horário para sua consulta."
      />

      {isLoading && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          Carregando consulta...
        </div>
      )}

      {!isLoading && !appointment && (
        <EmptyState
          title="Nenhuma consulta agendada"
          description="Você ainda não tem uma consulta disponível para reagendar."
        />
      )}

      {appointment && (
        <div className="grid gap-6 lg:grid-cols-2">
          <CurrentAppointmentCard
            appointment={appointment}
            doctor={doctor}
            isCancelling={cancelAppointment.isPending}
            onCancel={handleCancel}
          />
          <RescheduleForm
            date={date}
            time={time}
            isSubmitting={updateAppointment.isPending}
            onDateChange={setDate}
            onTimeChange={setTime}
            onSubmit={handleReschedule}
          />
        </div>
      )}
    </section>
  );
}
