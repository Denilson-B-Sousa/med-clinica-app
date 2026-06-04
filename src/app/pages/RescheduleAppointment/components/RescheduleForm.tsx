import { Info } from "phosphor-react";

export function RescheduleForm() {
  return (
    <form className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-lg font-bold">2. Nova data e horário</h2>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold">Nova data</label>

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

        <div className="inline-flex items-center gap-4 rounded-xl bg-blue-50 p-5 text-sm text-slate-600">
          <Info size={32} />
          Ao confirmar, sua consulta será reagendada para a nova data e horário
          selecionados.
        </div>

        <button
          type="submit"
          className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-600 font-bold text-white transition hover:bg-blue-700"
        >
          Confirmar reagendamento
        </button>
      </div>
    </form>
  );
}
