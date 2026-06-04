import { Trash } from "phosphor-react";

export function CurrentAppointmentCard() {
  return (
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
        className="mt-8 flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-500 font-bold text-red-500 transition hover:bg-red-50"
      >
        <Trash /> Cancelar consulta
      </button>
    </aside>
  );
}
