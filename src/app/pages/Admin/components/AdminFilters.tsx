import { CalendarBlank, Funnel, X } from "phosphor-react";

type AdminFiltersProps = {
  onFilter?: () => void;
  onClear?: () => void;
};

export function AdminFilters({ onFilter, onClear }: AdminFiltersProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1.1fr_0.7fr_0.8fr_0.7fr_auto_auto] lg:items-end">
      <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
        Medico
        <select className="h-12 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
          <option>Todos os medicos</option>
          <option>Dra. Ana Carolina Souza</option>
          <option>Dr. Ricardo Almeida</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
        Paciente
        <input
          type="search"
          placeholder="Buscar paciente"
          className="h-12 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
        Status
        <select className="h-12 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
          <option>Todos</option>
          <option>Agendada</option>
          <option>Realizada</option>
          <option>Cancelada</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
        Data
        <span className="relative">
          <CalendarBlank
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
            size={19}
          />
          <input
            type="text"
            defaultValue="26/05/2026"
            className="h-12 w-full rounded-md border border-slate-300 px-11 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </span>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
        Periodo
        <select className="h-12 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
          <option>Dia</option>
          <option>Manha</option>
          <option>Tarde</option>
          <option>Noite</option>
        </select>
      </label>

      <button
        type="button"
        onClick={onFilter}
        className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        <Funnel size={18} />
        Filtrar
      </button>

      <button
        type="button"
        onClick={onClear}
        className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
      >
        <X size={16} />
        Limpar filtros
      </button>
    </div>
  );
}
