import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { Button } from "@/components/Button/Button";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { useCancelAppointment } from "@/hooks/appointment/useCancelAppointment";
import { useNextAppointment } from "@/hooks/appointment/useNextAppointment";
import { useUpdateAppointment } from "@/hooks/appointment/useUpdateAppointment";
import { appointmentService } from "@/services/appointment/appointmentService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { CurrentAppointmentCard, RescheduleForm } from "./components";

export function RescheduleAppointment() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { id: appointmentId } = useParams();

  const { data: nextAppointment, isLoading: isNextAppointmentLoading } =
    useNextAppointment();
  const {
    data: selectedAppointment,
    isLoading: isSelectedAppointmentLoading,
  } = useQuery({
    queryKey: ["appointment-to-reschedule", appointmentId],
    enabled: Boolean(appointmentId),
    queryFn: async () => {
      const appointments = await appointmentService.findHistory({
        page: 0,
        size: 100,
      });

      return (
        appointments.content.find(
          (appointment) => appointment.id === appointmentId,
        ) ?? null
      );
    },
  });
  const updateAppointment = useUpdateAppointment();
  const cancelAppointment = useCancelAppointment();
  const isLoading = appointmentId
    ? isSelectedAppointmentLoading
    : isNextAppointmentLoading;
  const appointment = appointmentId ? selectedAppointment : nextAppointment;

  async function handleReschedule() {
    if (!appointment) {
      return;
    }

    if (!date || !time) {
      toast.error("Informe a nova data e horario da consulta.");
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
          primaryAction={
            <Button to="/agendar-consulta" size="md" primary>
              Agendar consulta
            </Button>
          }
        />
      )}

      {appointment && (
        <div className="grid gap-6 lg:grid-cols-2">
          <CurrentAppointmentCard
            appointment={appointment}
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
