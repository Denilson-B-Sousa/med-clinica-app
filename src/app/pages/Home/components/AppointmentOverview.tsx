import { DoctorCard } from "@/components/DoctorCard/DoctorCard";
import { NextAppointmentCard } from "@/components/NextAppointmentCard/NextAppointmentCard";
import { QuickActions } from "@/components/QuickActions/QuickAction";
import type { Appointment } from "@/types/Appointment";

type AppointmentOverviewProps = {
  appointment: Appointment;
};

export function AppointmentOverview({ appointment }: AppointmentOverviewProps) {
  return (
    <section className="grid grid-cols-1 gap-6 px-12 py-4 xl:grid-cols-[2fr_1fr]">
      <div className="grid gap-6 rounded-3xl border border-zinc-100 bg-white shadow-md lg:grid-cols-[370px_1fr]">
        <NextAppointmentCard appointment={appointment} />
        <DoctorCard appointment={appointment} />
      </div>

      <aside className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-md">
        <QuickActions />
      </aside>
    </section>
  );
}
