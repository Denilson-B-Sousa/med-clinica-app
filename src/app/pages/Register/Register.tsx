import "react-datepicker/dist/react-datepicker.css";
import "react-form-wizard-component/dist/style.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddressBook, Lock, User } from "phosphor-react";
import { useState } from "react";
import FormWizard from "react-form-wizard-component";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useCep } from "@/hooks/patient/useCep";
import { useRegisterPatient } from "@/hooks/patient/useRegisterPatient";
import { registerSchema, type RegisterSchema } from "@/schemas/RegisterSchema";
import { AddressStep, PersonalDataStep, SecurityStep } from "./components";
import { toast } from "sonner";

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

export function Register() {
  const { mutateAsync, isPending } = useRegisterPatient();
  const navigate = useNavigate();
  const { mutateAsync: fetchAddressByCep } = useCep();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setValue,
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

  async function handleRegister(data: RegisterSchema) {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: onlyNumbers(data.phone),
      cpf: data.cpf,
      address: {
        street: data.address.street,
        number: data.address.number,
        district: data.address.district,
        city: data.address.city,
        state: data.address.state,
        zipcode: onlyNumbers(data.address.zipcode),
      },
      birthDate: data.birthDate,
      gender: data.gender,
    };

    await mutateAsync(payload);
     
    toast.success("Cadastro realizado com sucesso.");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  async function handleCepChange(cep: string) {
    try {
      const address = await fetchAddressByCep(cep);

      /* altere o valor de address.street e depois valide esse campo de novo”. */
      setValue("address.street", address.logradouro, { shouldValidate: true });

      setValue("address.district", address.bairro, { shouldValidate: true });
      setValue("address.city", address.localidade, { shouldValidate: true });
      setValue("address.state", address.uf, { shouldValidate: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl p-6 text-left">
      <FormWizard
        title="Realize seu Cadastro"
        subtitle="Preencha seus dados em etapas"
        color="#0094CB"
        nextButtonText="Próximo"
        backButtonText="Voltar"
        finishButtonText={isPending ? "Cadastrando..." : "Finalizar Cadastro"}
        onComplete={handleSubmit(handleRegister)}
      >
        <FormWizard.TabContent title="Dados pessoais" icon={<User size={24} />}>
          <PersonalDataStep
            control={control}
            errors={errors}
            register={register}
          />
        </FormWizard.TabContent>

        <FormWizard.TabContent
          title="Endereço"
          icon={<AddressBook size={24} />}
        >
          <AddressStep
            control={control}
            errors={errors}
            onCepComplete={handleCepChange}
            register={register}
          />
        </FormWizard.TabContent>

        <FormWizard.TabContent title="Segurança" icon={<Lock size={24} />}>
          <SecurityStep
            errors={errors}
            isConfirmPasswordVisible={showConfirmPassword}
            isPasswordVisible={showPassword}
            onToggleConfirmPassword={() =>
              setShowConfirmPassword((prev) => !prev)
            }
            onTogglePassword={() => setShowPassword((prev) => !prev)}
            register={register}
          />
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
