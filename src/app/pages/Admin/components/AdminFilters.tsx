import { CalendarBlank, Funnel, X } from "phosphor-react";
import type {
  AdminAppointmentsFilterValues,
  AdminClinicUnitOption,
  AdminDoctorOption,
} from "../types";
import type { FormEvent } from "react";

type AdminFiltersProps = {
  clinicUnits: AdminClinicUnitOption[];
  doctors: AdminDoctorOption[];
  values: AdminAppointmentsFilterValues;
  isLoadingDoctors?: boolean;
  onChange: (values: AdminAppointmentsFilterValues) => void;
  onFilter?: () => void;
  onClear?: () => void;
};

export function AdminFilters({
  clinicUnits,
  doctors,
  values,
  isLoadingDoctors,
  onChange,
  onFilter,
  onClear,
}: AdminFiltersProps) {
  function updateFilter(
    field: keyof AdminAppointmentsFilterValues,
    value: string,
  ) {
    onChange({
      ...values,
      [field]: value,
      ...(field === "clinicUnitId" ? { doctorId: "" } : {}),
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onFilter?.();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#20375F]">
          Unidade
          <select
            value={values.clinicUnitId}
            onChange={(event) =>
              updateFilter("clinicUnitId", event.target.value)
            }
            className="h-12 min-w-0 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Todas as unidades</option>
            {clinicUnits.map((clinicUnit) => (
              <option key={clinicUnit.id} value={clinicUnit.id}>
                {clinicUnit.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#20375F]">
          Medico
          <select
            value={values.doctorId}
            onChange={(event) => updateFilter("doctorId", event.target.value)}
            className="h-12 min-w-0 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
            disabled={isLoadingDoctors}
          >
            <option value="">
              {isLoadingDoctors ? "Carregando medicos" : "Todos os medicos"}
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#20375F]">
          Paciente
          <input
            type="search"
            value={values.patientName}
            onChange={(event) =>
              updateFilter("patientName", event.target.value)
            }
            placeholder="Buscar paciente"
            className="h-12 min-w-0 rounded-md border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>
      </div>

      <div className="grid min-w-0 gap-4 md:grid-cols-3 xl:grid-cols-[180px_220px_180px_1fr] xl:items-end">
        <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#20375F]">
          Status
          <select
            value={values.status}
            onChange={(event) => updateFilter("status", event.target.value)}
            className="h-12 min-w-0 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Todos</option>
            <option value="SCHEDULED">Agendada</option>
            <option value="CONFIRMED">Confirmada</option>
            <option value="COMPLETED">Realizada</option>
            <option value="CANCELED">Cancelada</option>
          </select>
        </label>

        <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#20375F]">
          Data
          <span className="relative min-w-0">
            <CalendarBlank
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
              size={19}
            />
            <input
              type="date"
              value={values.date}
              onChange={(event) => updateFilter("date", event.target.value)}
              className="h-12 w-full min-w-0 rounded-md border border-slate-300 px-11 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </span>
        </label>

        <label className="grid min-w-0 gap-2 text-sm font-semibold text-[#20375F]">
          Periodo
          <select
            value={values.period}
            onChange={(event) => updateFilter("period", event.target.value)}
            className="h-12 min-w-0 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Todos</option>
            <option value="DAY">Dia</option>
            <option value="MORNING">Manha</option>
            <option value="AFTERNOON">Tarde</option>
            <option value="EVENING">Noite</option>
          </select>
        </label>

        <div className="flex min-w-0 flex-col gap-3 sm:flex-row xl:justify-end">
          <button
            type="submit"
            className="flex h-12 min-w-32 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Funnel size={18} />
            Filtrar
          </button>

          <button
            type="button"
            onClick={onClear}
            className="flex h-12 min-w-36 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            <X size={16} />
            Limpar filtros
          </button>
        </div>
      </div>
    </form>
  );
}
