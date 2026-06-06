import { Button } from "@/components/Button/Button";
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
          <Button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            size="tab"
            variant={filter.value === activeFilter ? "tabActive" : "tab"}
          >
            {filter.label}
          </Button>
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

        <Button
          type="button"
          onClick={onClear}
          size="inputAction"
          variant="neutralOutline"
        >
          Limpar
        </Button>
      </div>
    </div>
  );
}
