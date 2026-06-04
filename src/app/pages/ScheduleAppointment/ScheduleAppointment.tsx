import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { AppointmentSummary, ScheduleAppointmentForm } from "./components";

export function ScheduleAppointment() {
  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="mb-5">
        <BackLink to="/home" />
      </div>

      <PageHeader
        title="Agendar consulta"
        description="Preencha os dados abaixo para agendar sua consulta."
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <ScheduleAppointmentForm />
        <AppointmentSummary />
      </div>
    </section>
  );
}
