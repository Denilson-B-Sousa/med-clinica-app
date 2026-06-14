import EmptyStateImage from "@/assets/empty-appointment.svg";
import { Button } from "@/components/Button/Button";
import { EmptyState } from "@/components/EmptyState/EmptyState";

export function NoAppointmentState() {
  return (
    <section>
      <EmptyState
        illustration={
          <img
            src={EmptyStateImage}
            alt="Nenhuma consulta agendada"
            className="h-full w-full object-contain xl:h-100 xl:w-150"
          />
        }
        title="Nenhuma consulta agendada"
        description="Parece que você ainda não tem consultas agendadas. Explore nossos médicos e marque sua próxima consulta!"
        primaryAction={
          <Button to="/agendar-consulta" size="md" primary>
            Agendar Consulta
          </Button>
        }
        secondaryAction={
          <Button to="/agendar-consulta" size="md" secondary>
            Ver Médicos
          </Button>
        }
      />
    </section>
  );
}
