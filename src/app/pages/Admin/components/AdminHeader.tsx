import { Bell, CaretDown, MagnifyingGlass } from "phosphor-react";

export function AdminHeader() {
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-[#0B1F4D]">
          Area Administrativa
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Gerencie a agenda, consultas e usuarios da clinica.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="relative block w-full sm:w-[380px]">
          <span className="sr-only">Busca administrativa</span>
          <input
            type="search"
            placeholder="Buscar pacientes, consultas, medicos..."
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-5 pr-12 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          <MagnifyingGlass
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={22}
          />
        </label>

        <div className="hidden h-10 w-px bg-slate-200 sm:block" />

        <button
          type="button"
          className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
          aria-label="Notificacoes"
        >
          <Bell size={24} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1 text-left transition hover:bg-slate-100"
        >
          <img
            src="https://i.pravatar.cc/80?img=47"
            alt="Administrador"
            className="h-11 w-11 rounded-full object-cover"
          />
          <span className="hidden min-w-40 md:block">
            <strong className="block text-sm text-[#0B1F4D]">
              Administrador
            </strong>
            <small className="text-slate-600">admin@medclinica.com.br</small>
          </span>
          <CaretDown className="text-slate-600" size={18} />
        </button>
      </div>
    </div>
  );
}
