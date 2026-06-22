import { Link } from "react-router-dom";
import { Buildings, MagnifyingGlass, UserCircle } from "phosphor-react";

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
            placeholder="Buscar pacientes, consultas, medicos, unidades..."
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-5 pr-12 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          <MagnifyingGlass
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={22}
          />
        </label>

        <Link
          to="/administracao/unidades"
          className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-300 bg-white px-4 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
        >
          <Buildings size={18} weight="bold" />
          Unidades
        </Link>

        <Link
          to="/administracao/perfil"
          className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-slate-100"
        >
          <UserCircle className="text-[#20375F]" size={32} weight="bold" />
          <span className="hidden min-w-40 md:block">
            <strong className="block text-sm text-[#0B1F4D]">
              Administrador
            </strong>
            <small className="text-slate-600">admin@medclinica.com.br</small>
          </span>
        </Link>
      </div>
    </div>
  );
}
