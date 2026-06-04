import { CalendarPlus, CaretRight, Clock, Calendar } from "phosphor-react";
import { Link } from "react-router-dom";

export function QuickActions() {
  return (
    <>
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-semibold text-slate-900">Ações rápidas</h3>

        <div className="mt-6 flex flex-col gap-4">
          <button className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                <CalendarPlus />
              </div>

              <Link to="/agendar-consulta" className="text-left">
                <h4 className="font-semibold text-slate-900">
                  Agendar consulta
                </h4>

                <p className="text-sm text-slate-500">
                  Encontre o melhor horário
                </p>
              </Link>
            </div>

            <CaretRight />
          </button>

          <button className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                <Calendar />
              </div>

              <Link to="/reagendar-consulta" className="text-left">
                <h4 className="font-semibold text-slate-900">
                  Reagendar consulta
                </h4>

                <p className="text-sm text-slate-500">Escolha uma nova data</p>
              </Link>
            </div>

            <CaretRight />
          </button>

          <button className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                <Clock />
              </div>

              <Link to="/historico-consultas" className="text-left">
                <h4 className="font-semibold text-slate-900">
                  Histórico de consultas
                </h4>

                <p className="text-sm text-slate-500">
                  Veja todas as consultas
                </p>
              </Link>
            </div>

            <CaretRight />
          </button>
        </div>
      </div>
    </>
  );
}
