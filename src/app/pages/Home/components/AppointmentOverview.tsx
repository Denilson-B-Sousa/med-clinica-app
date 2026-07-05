import { DoctorCard } from "@/components/DoctorCard/DoctorCard";
import { NextAppointmentCard } from "@/components/NextAppointmentCard/NextAppointmentCard";
import { QuickActions } from "@/components/QuickActions/QuickAction";
import type { AppointmentHistoryItem } from "@/types/Appointment";

type AppointmentOverviewProps = {
  appointment: AppointmentHistoryItem;
};

export function AppointmentOverview({ appointment }: AppointmentOverviewProps) {
  return (
    <section className="grid grid-cols-1 gap-6 px-12 py-4 xl:grid-cols-[2fr_1fr]">
      <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white shadow-[0_18px_45px_-15px_rgba(15,23,42,0.35)] lg:grid-cols-[370px_1fr]">
        <NextAppointmentCard appointment={appointment} />
        <DoctorCard appointment={appointment} />
      </div>

      <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-15px_rgba(15,23,42,0.35)]">
        <QuickActions nextAppointmentId={appointment.id} />
      </aside>
    </section>
  );
}
