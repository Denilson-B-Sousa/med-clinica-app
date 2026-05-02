import "react-datepicker/dist/react-datepicker.css";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";
import { AddressBook, Lock, User } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";


import { Input } from "@/components/Input/Input";
import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/RegisterSchema";

const STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export function Register() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      cpf: "",
      phone: "",
      email: "",
      birthDate: "",
      gender: undefined,
      address: {
        zipcode: "",
        street: "",
        district: "",
        city: "",
        state: undefined,
        number: "",
      },
      password: "",
      confirmPassword: "",
    },
  });

  function handleRegister(data: RegisterSchema) {
    const payload = {
      nome: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      cpf: data.cpf,
      address: {
        street: data.address.street,
        number: data.address.number,
        district: data.address.district,
        city: data.address.city,
        state: data.address.state,
        zipcode: data.address.zipcode,
      },
      birthDate: data.birthDate,
      gender: data.gender
      }

    console.log(payload);
  }

  return (
    <section className="w-full max-w-3xl mx-auto p-6 text-left">
      <FormWizard
        title="Realize seu Cadastro"
        subtitle="Preencha seus dados em etapas"
        color="#0094CB"
        nextButtonText="Próximo"
        backButtonText="Voltar"
        finishButtonText="Finalizar"
        onComplete={handleSubmit(handleRegister)}
      >
        <FormWizard.TabContent title="Dados pessoais" icon={<User size={24} />}>
          <div className="grid gap-4 mt-6">
            <div className="flex flex-col gap-1">
              <Input
                size="md"
                placeholder="Nome completo"
                {...register("name")}
              />

              {errors.name && (
                <span className="min-h-5 text-sm text-red-500 text-left">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Controller
                  control={control}
                  name="cpf"
                  render={({ field }) => (
                    <InputMask
                      component={Input}
                      mask="___.___.___-__"
                      replacement={{ _: /\d/ }}
                      size="md"
                      placeholder="CPF"
                      {...field}
                    />
                  )}
                />

                {errors.cpf && (
                  <span className="min-h-5 text-sm text-red-500 text-left">
                    {errors.cpf.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Controller
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <InputMask
                      component={Input}
                      mask="(__) _____-____"
                      replacement={{ _: /\d/ }}
                      size="md"
                      placeholder="Telefone"
                      {...field}
                    />
                  )}
                />

                {errors.phone && (
                  <span className="min-h-5 text-sm text-red-500 text-left">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Input
                size="md"
                type="email"
                placeholder="E-mail"
                {...register("email")}
              />

              {errors.email && (
                <span className="min-h-5 text-sm text-red-500 text-left">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Input
                  size="md"
                  type="date"
                  placeholder="Data de nascimento"
                  {...register("birthDate")}
                />

                {errors.birthDate && (
                  <span className="min-h-5 text-sm text-red-500 text-left">
                    {errors.birthDate.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <select
                  {...register("gender")}
                  className="w-full px-4 py-3 text-base rounded-md border border-gray-300 font-inter outline-none focus:border-[#0094CB]"
                >
                  <option value="">Selecione o Sexo Biológico</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </select>

                {errors.gender && (
                  <span className="min-h-5 text-sm text-red-500 text-left">
                    {errors.gender.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </FormWizard.TabContent>

        <FormWizard.TabContent
          title="Endereço"
          icon={<AddressBook size={24} />}
        >
          <div className="grid gap-4 mt-6">
            <div className="flex flex-col gap-1">
              <Controller
                control={control}
                name="address.zipcode"
                render={({ field }) => (
                  <InputMask
                    component={Input}
                    mask="_____-___"
                    replacement={{ _: /\d/ }}
                    size="md"
                    placeholder="CEP"
                    {...field}
                  />
                )}
              />

              {errors.address?.zipcode && (
                <span className="min-h-5 text-sm text-red-500 text-left">
                  {errors.address.zipcode.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Input
                size="md"
                placeholder="Rua"
                {...register("address.street")}
              />

              {errors.address?.street && (
                <span className="min-h-5 text-sm text-red-500 text-left">
                  {errors.address.street.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Input
                  size="md"
                  placeholder="Bairro"
                  {...register("address.district")}
                />

                {errors.address?.district && (
                  <span className="min-h-5 text-sm text-red-500 text-left">
                    {errors.address.district.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Input
                  size="md"
                  placeholder="Cidade"
                  {...register("address.city")}
                />

                {errors.address?.city && (
                  <span className="min-h-5 text-sm text-red-500 text-left">
                    {errors.address.city.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <select
                  {...register("address.state")}
                  className="w-full px-4 py-3 text-base rounded-md border border-gray-300 font-inter outline-none focus:border-[#0094CB]"
                >
                  <option value="">Estado</option>

                  {STATES.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>

                {errors.address?.state && (
                  <span className="min-h-5 text-sm text-red-500 text-left">
                    {errors.address.state.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Input
                  size="md"
                  placeholder="Número"
                  {...register("address.number")}
                />

                {errors.address?.number && (
                  <span className="min-h-5 text-sm text-red-500 text-left">
                    {errors.address.number.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </FormWizard.TabContent>

        <FormWizard.TabContent title="Segurança" icon={<Lock size={24} />}>
          <div className="grid gap-4 mt-6">
            <div className="flex flex-col gap-1">
              <Input
                size="md"
                type="password"
                placeholder="Senha"
                {...register("password")}
              />

              {errors.password && (
                <span className="min-h-5 text-sm text-red-500 text-left">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Input
                size="md"
                type="password"
                placeholder="Confirmar senha"
                {...register("confirmPassword")}
              />

              {errors.confirmPassword && (
                <span className="min-h-5 text-sm text-red-500 text-left">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
        </FormWizard.TabContent>
      </FormWizard>

      <div className="flex pl-4">
        <Link to="/login" className="text-sm text-[#0094CB] hover:underline">
          Já tem uma conta? Faça login
        </Link>
      </div>
    </section>
  );
}
