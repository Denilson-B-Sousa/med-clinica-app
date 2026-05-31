import { Button } from "@/components/Button/Button";
import { DoctorCard } from "@/components/DoctorCard/DoctorCard";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { NextAppointmentCard } from "@/components/NextAppointmentCard/NextAppointmentCard";
import { QuickActions } from "@/components/QuickActions/QuickAction";
import EmptyStateImage from "@/assets/empty-appointment.svg";
import { useNextAppointment } from "@/hooks/appointment/useNextAppointment";

export function PatientArea() {

  const { data: appointment } = useNextAppointment();

  return (
    <>
      <section className="flex flex-col px-14">
        <span className="text-2xl">
          Olá, <strong>Denilson!</strong>
        </span>
        <span>Acompanhe suas consultas e informações de saúde.</span>
      </section>
      {appointment ? (
        <>
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr] px-12 py-4">
            <div className="grid gap-6 bg-white rounded-3xl border border-zinc-100 shadow-md lg:grid-cols-[370px_1fr]">
              <NextAppointmentCard appointment={appointment} />
              <DoctorCard appointment={appointment}/>
            </div>
            <aside className="bg-white rounded-3xl border border-zinc-100 shadow-md p-6">
              <QuickActions />
            </aside>
          </section>
        </>
      ) : (
        <>
          <section>
            <EmptyState
              illustration={
                <img
                  src={EmptyStateImage}
                  alt="Nenhuma consulta agendada"
                  className="w-full h-full xl:w-150 xl:h-100 object-contain"
                />
              }
              title="Nenhuma consulta agendada"
              description="Parece que você ainda não tem consultas agendadas. Explore nossos médicos e marque sua próxima consulta!"
              primaryAction={
                <Button size="md" primary>
                  Agendar Consulta
                </Button>
              }
              secondaryAction={
                <Button size="md" secondary>
                  Ver Médicos
                </Button>
              }
            />
          </section>
        </>
      )}
    </>
  );}
