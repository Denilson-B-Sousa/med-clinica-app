export function ScheduleAppointmentForm() {
  return (
    <form className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-lg font-bold">1. Detalhes da consulta</h2>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Especialidade
          </label>

          <select className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
            <option>Selecione a especialidade</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Médico</label>

          <select className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
            <option>Selecione o médico</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">Data</label>

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
              <option>Selecione o horário</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Observações
          </label>

          <textarea
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-300 p-4 text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="Conte-nos o motivo da consulta ou outras informações importantes."
          />
        </div>

        <button
          type="submit"
          className="flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#0094CB] font-bold text-white transition hover:bg-blue-700"
        >
          Confirmar agendamento
        </button>
      </div>
    </form>
  );
}
