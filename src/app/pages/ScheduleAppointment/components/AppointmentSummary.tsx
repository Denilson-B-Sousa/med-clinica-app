import { Info } from "phosphor-react";

export function AppointmentSummary() {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-lg font-bold">2. Resumo da consulta</h2>

      <div className="mb-8 flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/72?img=12"
          alt="Médica"
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h3 className="text-xl font-bold">Dra. Ana Carolina Souza</h3>
          <p className="text-sm uppercase text-slate-600">Cardiologia</p>
          <span className="mt-2 inline-flex rounded-md bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600">
            CRM 123456-GO
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold">Especialidade</p>
          <p className="text-slate-500">—</p>
        </div>

        <div>
          <p className="text-sm font-bold">Data</p>
          <p className="text-slate-500">—</p>
        </div>

        <div>
          <p className="text-sm font-bold">Horário</p>
          <p className="text-slate-500">—</p>
        </div>

        <div>
          <p className="text-sm font-bold">Local de atendimento</p>
          <p className="font-semibold">Goiânia</p>
          <p className="text-sm text-slate-600">Rua das Flores, 123</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-slate-50 p-5">
        <p className="inline-flex items-center gap-2 text-sm text-slate-600">
          <Info size={32} />
          Chegue com 15 minutos de antecedência. Não se esqueça de levar seus
          documentos e exames.
        </p>
      </div>
    </aside>
  );
}
