import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { APPOINTMENT_HISTORY } from "./constants/appointments";
import {
  AppointmentFilters,
  AppointmentPagination,
  AppointmentsTable,
} from "./components";

export function AppointmentHistory() {
  return (
    <section className="mx-auto max-w-7xl px-8">
      <BackLink to="/home" />

      <PageHeader
        title="Histórico de consultas"
        description="Veja aqui todas as suas consultas realizadas e agendadas."
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <AppointmentFilters />
        <AppointmentsTable appointments={APPOINTMENT_HISTORY} />
        <AppointmentPagination />
      </div>
    </section>
  );
}
