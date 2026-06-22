import type { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Buildings,
  FloppyDisk,
  MapPinLine,
  Phone,
} from "phosphor-react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clinicUnitService } from "@/services/clinicUnit/clinicUnitService";
import { BRAZILIAN_STATES } from "@/pages/Register/constants/states";
import type { ClinicUnit } from "@/types/ClinicUnit";
import { AdminHeader } from "./components";
import { adminClinicUnits } from "./data";

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

const initialClinicUnits: ClinicUnit[] = adminClinicUnits.map((clinicUnit) => ({
  id: clinicUnit.id,
  name: clinicUnit.name,
  phone: "-",
  address: {
    street: "-",
    number: "-",
    district: "-",
    city: "-",
    state: "-",
    zipcode: "-",
  },
}));

export function AdminClinicUnits() {
  const queryClient = useQueryClient();
  const { data: clinicUnits = initialClinicUnits, isLoading } = useQuery({
    queryKey: ["clinic-units"],
    queryFn: clinicUnitService.findAll,
    initialData: initialClinicUnits,
  });

  const createClinicUnit = useMutation({
    mutationFn: clinicUnitService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["clinic-units"] });
      toast.success("Unidade cadastrada com sucesso.");
    },
    onError: () => {
      toast.error("Nao foi possivel cadastrar a unidade.");
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    createClinicUnit.mutate(
      {
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        address: {
          street: String(formData.get("street") ?? ""),
          number: String(formData.get("number") ?? ""),
          district: String(formData.get("district") ?? ""),
          state: String(formData.get("state") ?? ""),
          city: String(formData.get("city") ?? ""),
          zipcode: String(formData.get("zipcode") ?? ""),
        },
      },
      {
        onSuccess: () => form.reset(),
      },
    );
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

        <section className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70">
          <div className="flex items-center gap-3">
            <Buildings className="text-[#20375F]" size={28} weight="bold" />
            <div>
              <h1 className="text-2xl font-bold text-[#0B1F4D]">
                Unidades da clinica
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Cadastre e consulte os locais usados por medicos e consultas.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-3 grid gap-3 xl:grid-cols-[1fr_1.15fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70"
          >
            <div className="flex items-center gap-3">
              <MapPinLine className="text-[#20375F]" size={24} weight="bold" />
              <h2 className="text-xl font-bold text-[#0B1F4D]">
                Nova unidade
              </h2>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <FormField label="Nome">
                <input
                  name="name"
                  required
                  className={fieldClassName}
                  placeholder="Unidade Centro"
                />
              </FormField>

              <FormField label="Telefone">
                <input
                  name="phone"
                  required
                  className={fieldClassName}
                  placeholder="(62) 3333-3333"
                />
              </FormField>

              <FormField label="CEP">
                <input
                  name="zipcode"
                  required
                  className={fieldClassName}
                  placeholder="74000-000"
                />
              </FormField>

              <FormField label="Logradouro">
                <input
                  name="street"
                  required
                  className={fieldClassName}
                  placeholder="Rua, avenida ou alameda"
                />
              </FormField>

              <FormField label="Numero">
                <input
                  name="number"
                  required
                  className={fieldClassName}
                  placeholder="100"
                />
              </FormField>

              <FormField label="Bairro">
                <input
                  name="district"
                  required
                  className={fieldClassName}
                  placeholder="Centro"
                />
              </FormField>

              <FormField label="Cidade">
                <input
                  name="city"
                  required
                  className={fieldClassName}
                  placeholder="Goiania"
                />
              </FormField>

              <FormField label="Estado">
                <select name="state" required className={selectClassName}>
                  <option value="">Selecione o estado</option>
                  {BRAZILIAN_STATES.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={createClinicUnit.isPending}
                className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                <FloppyDisk size={18} weight="bold" />
                {createClinicUnit.isPending
                  ? "Cadastrando..."
                  : "Cadastrar unidade"}
              </button>
            </div>
          </form>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70">
            <div className="flex items-center gap-3">
              <Phone className="text-[#20375F]" size={24} weight="bold" />
              <h2 className="text-xl font-bold text-[#0B1F4D]">
                Unidades cadastradas
              </h2>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead className="bg-slate-50 text-xs font-bold text-[#20375F]">
                  <tr>
                    <th className="px-4 py-3">Unidade</th>
                    <th className="px-4 py-3">Telefone</th>
                    <th className="px-4 py-3">Endereco</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 text-sm text-[#20375F]">
                  {clinicUnits.map((clinicUnit) => (
                    <tr key={clinicUnit.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold">
                        {clinicUnit.name}
                      </td>
                      <td className="px-4 py-3">{clinicUnit.phone}</td>
                      <td className="px-4 py-3">
                        <span>
                          {clinicUnit.address.street},{" "}
                          {clinicUnit.address.number}
                        </span>
                        <small className="mt-1 block text-xs text-slate-500">
                          {clinicUnit.address.district} -{" "}
                          {clinicUnit.address.city}/{clinicUnit.address.state}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isLoading && (
              <p className="mt-4 text-sm text-slate-500">
                Atualizando unidades...
              </p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
