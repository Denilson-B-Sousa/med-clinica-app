import type { AppointmentStatus } from "@/types/Appointment";

export type AppointmentHistoryStatusFilter = Extract<
  AppointmentStatus,
  "SCHEDULED" | "COMPLETED" | "CANCELED"
>;
export type AppointmentHistoryFilter = "ALL" | AppointmentHistoryStatusFilter;

const FILTERS: Array<{
  label: string;
  value: AppointmentHistoryFilter;
}> = [
  { label: "Todas", value: "ALL" },
  { label: "Agendadas", value: "SCHEDULED" },
  { label: "Realizadas", value: "COMPLETED" },
  { label: "Canceladas", value: "CANCELED" },
];

type AppointmentFiltersProps = {
  activeFilter: AppointmentHistoryFilter;
  search: string;
  onFilterChange: (filter: AppointmentHistoryFilter) => void;
  onSearchChange: (search: string) => void;
  onClear: () => void;
};

export function AppointmentFilters({
  activeFilter,
  search,
  onFilterChange,
  onSearchChange,
  onClear,
}: AppointmentFiltersProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-8 overflow-x-auto border-b border-slate-200">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={
              filter.value === activeFilter
                ? "cursor-pointer border-b-2 border-blue-600 px-3 pb-4 font-semibold text-blue-600"
                : "cursor-pointer px-3 pb-4 text-slate-500 transition hover:text-blue-600"
            }
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar consulta"
          className="h-12 rounded-lg border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={onClear}
          className="h-12 cursor-pointer rounded-lg border border-slate-300 px-5 font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
