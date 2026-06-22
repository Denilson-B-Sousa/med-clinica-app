import { Link } from "react-router-dom";
import {
  ArrowLeft,
  IdentificationCard,
  Key,
  ShieldCheck,
  UserCircle,
} from "phosphor-react";
import { AdminHeader } from "./components";

const adminPermissions = [
  "Gerenciar pacientes",
  "Gerenciar medicos",
  "Gerenciar consultas",
  "Consultar auditoria",
];

export function AdminProfile() {
  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1560px]">
        <AdminHeader />

        <div className="mt-6">
          <Link
            to="/administracao"
            className="inline-flex cursor-pointer items-center gap-2 rounded-md px-1 py-2 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
          >
            <ArrowLeft size={18} weight="bold" />
            Voltar para area administrativa
          </Link>
        </div>

        <section className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-center gap-4">
              <UserCircle className="text-[#20375F]" size={56} weight="bold" />
              <div>
                <h1 className="text-2xl font-bold text-[#0B1F4D]">
                  Perfil do administrador
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Dados de acesso e permissoes administrativas.
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
              <ShieldCheck size={16} weight="bold" />
              Perfil ativo
            </span>
          </div>
        </section>

        <div className="mt-3 grid gap-3 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70">
            <div className="flex items-center gap-3">
              <IdentificationCard
                className="text-[#20375F]"
                size={24}
                weight="bold"
              />
              <h2 className="text-xl font-bold text-[#0B1F4D]">
                Dados do perfil
              </h2>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
                Nome
                <input
                  defaultValue="Administrador"
                  className="h-12 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
                E-mail
                <input
                  defaultValue="admin@medclinica.com.br"
                  type="email"
                  className="h-12 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
                Perfil
                <input
                  defaultValue="ADMIN"
                  disabled
                  className="h-12 cursor-not-allowed rounded-md border border-slate-200 bg-slate-100 px-4 text-sm font-bold text-slate-600"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
                Status
                <input
                  defaultValue="Ativo"
                  disabled
                  className="h-12 cursor-not-allowed rounded-md border border-slate-200 bg-slate-100 px-4 text-sm font-bold text-slate-600"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="h-11 cursor-pointer rounded-md bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Salvar perfil
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70">
            <div className="flex items-center gap-3">
              <Key className="text-[#20375F]" size={24} weight="bold" />
              <h2 className="text-xl font-bold text-[#0B1F4D]">
                Permissoes e seguranca
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {adminPermissions.map((permission) => (
                <div
                  key={permission}
                  className="flex items-center justify-between rounded-md border border-slate-200 px-4 py-3"
                >
                  <span className="text-sm font-semibold text-[#20375F]">
                    {permission}
                  </span>
                  <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                    Permitido
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
                Senha atual
                <input
                  type="password"
                  className="h-12 rounded-md border border-slate-300 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
                Nova senha
                <input
                  type="password"
                  className="h-12 rounded-md border border-slate-300 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <button
              type="button"
              className="mt-6 h-11 cursor-pointer rounded-md border border-blue-300 px-6 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
            >
              Atualizar senha
            </button>
          </section>
        </div>
      </div>
    </section>
  );
}
