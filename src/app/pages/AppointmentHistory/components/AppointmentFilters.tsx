const FILTERS = ["Todas", "Agendadas", "Realizadas", "Canceladas"];

export function AppointmentFilters() {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-8 border-b border-slate-200">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={
              filter === "Todas"
                ? "border-b-2 border-blue-600 px-3 pb-4 font-semibold text-blue-600"
                : "px-3 pb-4 text-slate-500"
            }
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Buscar consulta"
          className="h-12 rounded-lg border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <button className="h-12 rounded-lg border border-slate-300 px-5 font-semibold text-slate-600">
          Filtrar
        </button>
      </div>
    </div>
  );
}
