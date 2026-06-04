import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { CurrentAppointmentCard, RescheduleForm } from "./components";

export function RescheduleAppointment() {
  return (
    <section className="mx-auto max-w-7xl px-8">
      <div className="mb-5">
        <BackLink to="/home" />
      </div>

      <PageHeader
        title="Reagendar consulta"
        description="Escolha uma nova data e horário para sua consulta."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <CurrentAppointmentCard />
        <RescheduleForm />
      </div>
    </section>
  );
}
