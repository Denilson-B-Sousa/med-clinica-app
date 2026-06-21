import type { FormEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FloppyDisk,
  IdentificationCard,
  LockKey,
  MapPinLine,
  UserPlus,
} from "phosphor-react";
import { toast } from "sonner";
import { MEDICAL_SPECIALITIES, type MedicalSpeciality } from "@/types/Doctor";
import { BRAZILIAN_STATES } from "@/pages/Register/constants/states";
import { AdminHeader } from "./components";

const SPECIALITY_LABELS: Record<MedicalSpeciality, string> = {
  ORTOPEDIA: "Ortopedia",
  CARDIOLOGIA: "Cardiologia",
  DERMATOLOGIA: "Dermatologia",
  ENDOCRINOLOGIA: "Endocrinologia",
  GASTROENTEROLOGIA: "Gastroenterologia",
  GERIATRIA: "Geriatria",
  HEMATOLOGIA: "Hematologia",
  INFECTOLOGIA: "Infectologia",
  NEUROLOGIA: "Neurologia",
  OFTALMOLOGIA: "Oftalmologia",
  ONCOLOGIA: "Oncologia",
  PEDIATRIA: "Pediatria",
  PNEUMOLOGIA: "Pneumologia",
  GINECOLOGIA: "Ginecologia",
  REUMATOLOGIA: "Reumatologia",
  UROLOGIA: "Urologia",
  PSICOLOGIA: "Psicologia",
  PSIQUIATRIA: "Psiquiatria",
};

const fieldClassName =
  "h-12 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const selectClassName =
  "h-12 cursor-pointer rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

function FormField({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#20375F]">
      {label}
      {children}
    </label>
  );
}

export function AdminDoctorRegister() {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Interface de cadastro do medico preenchida.");
  }

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

        <section className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-center gap-3">
              <UserPlus className="text-[#20375F]" size={28} weight="bold" />
              <div>
                <h1 className="text-2xl font-bold text-[#0B1F4D]">
                  Cadastrar medico
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Informe os dados de acesso, registro profissional e endereco.
                </p>
              </div>
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="mt-3 grid gap-3">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <IdentificationCard
                className="text-[#20375F]"
                size={24}
                weight="bold"
              />
              <h2 className="text-xl font-bold text-[#0B1F4D]">
                Dados profissionais
              </h2>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FormField label="Nome">
                <input
                  name="name"
                  required
                  className={fieldClassName}
                  placeholder="Nome completo"
                />
              </FormField>

              <FormField label="CPF">
                <input
                  name="cpf"
                  required
                  pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                  className={fieldClassName}
                  placeholder="000.000.000-00"
                />
              </FormField>

              <FormField label="Telefone">
                <input
                  name="phone"
                  required
                  className={fieldClassName}
                  placeholder="(00) 00000-0000"
                />
              </FormField>

              <FormField label="CRM">
                <input
                  name="crm"
                  required
                  pattern="\d{4,6}-[A-Z]{2}"
                  className={fieldClassName}
                  placeholder="123456-GO"
                />
              </FormField>

              <FormField label="Especialidade">
                <select name="speciality" required className={selectClassName}>
                  <option value="">Selecione a especialidade</option>
                  {MEDICAL_SPECIALITIES.map((speciality) => (
                    <option key={speciality} value={speciality}>
                      {SPECIALITY_LABELS[speciality]}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <LockKey className="text-[#20375F]" size={24} weight="bold" />
              <h2 className="text-xl font-bold text-[#0B1F4D]">
                Dados de acesso
              </h2>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <FormField label="E-mail">
                <input
                  name="email"
                  required
                  type="email"
                  className={fieldClassName}
                  placeholder="medico@medclinica.com.br"
                />
              </FormField>

              <FormField label="Senha inicial">
                <input
                  name="password"
                  required
                  type="password"
                  className={fieldClassName}
                  placeholder="Senha de acesso"
                />
              </FormField>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPinLine className="text-[#20375F]" size={24} weight="bold" />
              <h2 className="text-xl font-bold text-[#0B1F4D]">Endereco</h2>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FormField label="CEP">
                <input
                  name="address.zipcode"
                  required
                  className={fieldClassName}
                  placeholder="00000-000"
                />
              </FormField>

              <FormField label="Logradouro">
                <input
                  name="address.street"
                  required
                  className={fieldClassName}
                  placeholder="Rua, avenida ou alameda"
                />
              </FormField>

              <FormField label="Numero">
                <input
                  name="address.number"
                  required
                  className={fieldClassName}
                  placeholder="Numero"
                />
              </FormField>

              <FormField label="Bairro">
                <input
                  name="address.district"
                  required
                  className={fieldClassName}
                  placeholder="Bairro"
                />
              </FormField>

              <FormField label="Cidade">
                <input
                  name="address.city"
                  required
                  className={fieldClassName}
                  placeholder="Cidade"
                />
              </FormField>

              <FormField label="Estado">
                <select name="address.state" required className={selectClassName}>
                  <option value="">Selecione o estado</option>
                  {BRAZILIAN_STATES.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/administracao")}
              className="h-11 cursor-pointer rounded-md px-6 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              <FloppyDisk size={18} weight="bold" />
              Cadastrar medico
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
