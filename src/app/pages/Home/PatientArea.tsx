import { DoctorCard } from "@/components/DoctorCard/DoctorCard";
import { NextAppointmentCard } from "@/components/NextAppointmentCard/NextAppointmentCard";
import { QuickActions } from "@/components/QuickActions/QuickActions";


export function PatientArea() {


  return (
    <>
      <section className="flex flex-col px-14 py-4">
        <span className="text-2xl">
          Olá,{" "}
          <strong>
            Denilson!
          </strong>
        </span>
        <span>Acompanhe suas consultas e informações de saúde.</span>
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr] px-12 py-4">
        <div className="grid gap-6 bg-white rounded-3xl shadow-sm lg:grid-cols-[370px_1fr]">
          <NextAppointmentCard />
          <DoctorCard />
        </div>
        <aside>
          <QuickActions />
        </aside>
      </section>
    </>
  );
}