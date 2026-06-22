import { Button } from "@/components/Button/Button";
import { Calendar, CalendarPlus, CaretRight, Clock } from "phosphor-react";

type QuickActionsProps = {
  nextAppointmentId?: string;
};

export function QuickActions({ nextAppointmentId }: QuickActionsProps) {
  const reschedulePath = nextAppointmentId
    ? `/reagendar-consulta/${nextAppointmentId}`
    : "/reagendar-consulta";

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70">
      <h3 className="text-2xl font-semibold text-slate-900">Acoes rapidas</h3>

      <div className="mt-6 flex flex-col gap-4">
        <Button
          to="/agendar-consulta"
          size="quickAction"
          variant="quickAction"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-50 p-3 text-blue-600">
              <CalendarPlus />
            </div>

            <div className="text-left">
              <h4 className="font-semibold text-slate-900">
                Agendar consulta
              </h4>

              <p className="text-sm text-slate-500">
                Encontre o melhor horario
              </p>
            </div>
          </div>

          <CaretRight />
        </Button>

        <Button
          to={reschedulePath}
          size="quickAction"
          variant="quickAction"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-50 p-3 text-blue-600">
              <Calendar />
            </div>

            <div className="text-left">
              <h4 className="font-semibold text-slate-900">
                Reagendar consulta
              </h4>

              <p className="text-sm text-slate-500">Escolha uma nova data</p>
            </div>
          </div>

          <CaretRight />
        </Button>

        <Button
          to="/historico-consultas"
          size="quickAction"
          variant="quickAction"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-50 p-3 text-blue-600">
              <Clock />
            </div>

            <div className="text-left">
              <h4 className="font-semibold text-slate-900">
                Historico de consultas
              </h4>

              <p className="text-sm text-slate-500">Veja todas as consultas</p>
            </div>
          </div>

          <CaretRight />
        </Button>
      </div>
    </div>
  );
}
