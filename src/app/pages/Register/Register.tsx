/* eslint-disable @typescript-eslint/no-explicit-any */
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { InputMask } from "@react-input/mask";

import { User, AddressBook, Lock } from "phosphor-react";

import { Input } from "../../components/Input/Input";
import { Link } from "react-router-dom";

export function Register() {
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

  return (
    <section className="w-full max-w-3xl mx-auto p-6">
      <FormWizard
        title="Realize seu Cadastro"
        subtitle="Preencha seus dados em etapas"
        color="#0094CB"
        nextButtonText="Próximo"
        backButtonText="Voltar"
        finishButtonText="Finalizar"
        onComplete={() => console.log("Cadastro finalizado")}
      >
        <FormWizard.TabContent title="Dados pessoais" icon={<User size={24} />}>
          <div className="grid gap-4 mt-6">
            <Input size="md" placeholder="Nome completo" name="name" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputMask
                component={Input}
                mask="___.___.___-__"
                replacement={{ _: /\d/ }}
                size="md"
                placeholder="CPF"
                name="cpf"
              />

              <InputMask
                component={Input}
                mask="(__) _____-____"
                replacement={{ _: /\d/ }}
                size="md"
                placeholder="Telefone"
                name="phone"
              />
            </div>

            <Input size="md" type="email" placeholder="E-mail" name="email" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                size="md"
                type="date"
                placeholder="Data de nascimento"
                name="birthDate"
              />

              <select
                name="gender"
                className="w-full px-4 py-3 text-base rounded-md border border-gray-300 font-inter outline-none focus:border-[#0094CB]"
              >
                <option value="">Selecione o Sexo Biológico</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
              </select>
            </div>
          </div>
        </FormWizard.TabContent>

        <FormWizard.TabContent
          title="Endereço"
          icon={<AddressBook size={24} />}
        >
          <div className="grid gap-4 mt-6">
            <InputMask
              component={Input}
              mask="_____-___"
              replacement={{ _: /\d/ }}
              size="md"
              placeholder="CEP"
              name="address.zipcode"
            />

            <Input size="md" placeholder="Rua" name="address.street" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input size="md" placeholder="Bairro" name="address.district" />

              <Input size="md" placeholder="Cidade" name="address.city" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="address.state"              
                className="w-full px-4 py-3 text-base rounded-md border border-gray-300 font-inter outline-none focus:border-[#0094CB]"
              >
                <option value="">Estado</option>

                {STATES.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.value}
                  </option>
                ))}
              </select>
              <Input size="md" placeholder="Número" name="address.number" />
            </div>
          </div>
        </FormWizard.TabContent>

        <FormWizard.TabContent title="Segurança" icon={<Lock size={24} />}>
          <div className="grid gap-4 mt-6">
            <Input
              size="md"
              type="password"
              placeholder="Senha"
              name="password"
            />

            <Input
              size="md"
              type="password"
              placeholder="Confirmar senha"
              name="confirmPassword"
            />
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
