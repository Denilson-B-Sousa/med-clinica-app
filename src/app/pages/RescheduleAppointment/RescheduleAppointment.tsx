import { ArrowLeft, Info, Trash} from "phosphor-react";
import { Link } from "react-router-dom";

export function RescheduleAppointment() {
  return (
    <section className="mx-auto max-w-7xl px-8">
      <button className="mb-5 inline-flex items-center gap-2 text-sm text-sky-500">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-sky-500 hover:underline"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reagendar consulta</h1>
        <p className="mt-2 text-slate-600">
          Escolha uma nova data e horário para sua consulta.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-8 text-lg font-bold">1. Consulta atual</h2>

          <div className="space-y-6 rounded-2xl bg-slate-50 p-6">
            <div>
              <p className="text-sm font-bold">Data</p>
              <p className="text-slate-600">15 de julho de 2026</p>
            </div>

            <div>
              <p className="text-sm font-bold">Horário</p>
              <p className="text-slate-600">10:30</p>
            </div>

            <div>
              <p className="text-sm font-bold">Médico</p>
              <p className="font-semibold">Dra. Ana Carolina Souza</p>
              <p className="text-sm uppercase text-slate-600">Cardiologia</p>
            </div>

            <div>
              <p className="text-sm font-bold">Local</p>
              <p className="font-semibold">Goiânia</p>
              <p className="text-sm text-slate-600">Rua das Flores, 123</p>
            </div>
          </div>

          <button
            type="button"
            className="mt-8 flex gap-2 h-14 w-full items-center justify-center rounded-lg border border-red-500 font-bold text-red-500 transition hover:bg-red-50 cursor-pointer"
          >
            <Trash /> Cancelar consulta
          </button>
        </aside>

        <form className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-8 text-lg font-bold">2. Nova data e horário</h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Nova data
              </label>

              <input
                type="date"
                className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Horário disponível
              </label>

              <select className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option>Selecione o novo horário</option>
                <option>08:00</option>
                <option>09:30</option>
                <option>14:00</option>
                <option>16:30</option>
              </select>
            </div>

            <div className="rounded-xl bg-blue-50 p-5 text-sm text-slate-600 inline-flex items-center gap-4">
              <Info size={32} />
              Ao confirmar, sua consulta será reagendada para a nova data e
              horário selecionados.
            </div>

            <button
              type="submit"
              className="flex h-14 w-full items-center justify-center rounded-lg bg-blue-600 font-bold text-white transition hover:bg-blue-700 cursor-pointer"
            >
              Confirmar reagendamento
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
