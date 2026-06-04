import type { Doctor } from "@/types/Doctor";
import { Info } from "phosphor-react";

type AppointmentSummaryProps = {
  doctor?: Doctor;
  date?: string;
  time?: string;
  speciality?: string;
};

function formatDate(date?: string) {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function AppointmentSummary({
  doctor,
  date,
  time,
  speciality,
}: AppointmentSummaryProps) {
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
          <h3 className="text-xl font-bold">
            {doctor?.name ?? "Selecione um médico"}
          </h3>
          <p className="text-sm uppercase text-slate-600">
            {doctor?.speciality ?? speciality ?? "Especialidade"}
          </p>
          <span className="mt-2 inline-flex rounded-md bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600">
            {doctor?.crm ? `CRM ${doctor.crm}` : "CRM"}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold">Especialidade</p>
          <p className="text-slate-500">
            {doctor?.speciality ?? speciality ?? "—"}
          </p>
        </div>

        <div>
          <p className="text-sm font-bold">Data</p>
          <p className="text-slate-500">{formatDate(date)}</p>
        </div>

        <div>
          <p className="text-sm font-bold">Horário</p>
          <p className="text-slate-500">{time || "—"}</p>
        </div>

        <div>
          <p className="text-sm font-bold">Local de atendimento</p>
          <p className="font-semibold">{doctor?.address.city ?? "—"}</p>
          <p className="text-sm text-slate-600">
            {doctor
              ? `${doctor.address.street}, ${doctor.address.number}`
              : "Selecione um médico"}
          </p>
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
