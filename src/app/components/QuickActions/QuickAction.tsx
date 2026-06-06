import { Calendar, CalendarPlus, CaretRight, Clock } from "phosphor-react";
import { Link } from "react-router-dom";

type QuickActionsProps = {
  nextAppointmentId?: string;
};

export function QuickActions({ nextAppointmentId }: QuickActionsProps) {
  const reschedulePath = nextAppointmentId
    ? `/reagendar-consulta/${nextAppointmentId}`
    : "/reagendar-consulta";

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-semibold text-slate-900">Acoes rapidas</h3>

      <div className="mt-6 flex flex-col gap-4">
        <Link
          to="/agendar-consulta"
          className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
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
        </Link>

        <Link
          to={reschedulePath}
          className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
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
        </Link>

        <Link
          to="/historico-consultas"
          className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
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
        </Link>
      </div>
    </div>
  );
}
