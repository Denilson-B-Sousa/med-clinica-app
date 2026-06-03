import { ArrowLeft, Info } from "phosphor-react";
import { Link } from "react-router-dom";

export function ScheduleAppointment() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4">
        <button className="mb-5 inline-flex items-center gap-2 text-md text-sky-500">
          <Link to="/home" className="inline-flex items-center gap-2 text-sky-500 hover:underline">
            <ArrowLeft size={16} />
            Voltar
          </Link>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Agendar consulta</h1>

          <p className="mt-2 text-slate-600">
            Preencha os dados abaixo para agendar sua consulta.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Formulário */}
          <form className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-8 text-lg font-bold">1. Detalhes da consulta</h2>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Especialidade
                </label>

                <select className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                  <option>Selecione a especialidade</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Médico
                </label>

                <select className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                  <option>Selecione o médico</option>
                </select>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Data
                  </label>

                  <input
                    type="date"
                    className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Horário disponível
                  </label>

                  <select className="h-14 w-full rounded-lg border border-slate-300 px-4 text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                    <option>Selecione o horário</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Observações
                </label>

                <textarea
                  rows={5}
                  className="w-full resize-none rounded-lg border border-slate-300 p-4 text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="Conte-nos o motivo da consulta ou outras informações importantes."
                />
              </div>

              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#0094CB] font-bold text-white transition hover:bg-blue-700"
              >
                Confirmar agendamento
              </button>
            </div>
          </form>

          {/* Resumo */}
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
              <p className="text-sm text-slate-600 inline-flex items-center gap-2">
                <Info size={32} />
                Chegue com 15 minutos de antecedência. Não se esqueça de levar
                seus documentos e exames.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
