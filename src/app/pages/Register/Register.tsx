import "react-datepicker/dist/react-datepicker.css";
import "react-form-wizard-component/dist/style.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AddressBook, Lock, User } from "phosphor-react";
import { useEffect, useState } from "react";
import FormWizard from "react-form-wizard-component";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useCep } from "@/hooks/patient/useCep";
import { useRegisterPatient } from "@/hooks/patient/useRegisterPatient";
import { useGooglePendingSignup } from "@/hooks/user/useGooglePendingSignup";
import { registerSchema, type RegisterSchema } from "@/schemas/RegisterSchema";
import { completeGooglePatientSignup } from "@/services/user/completeGooglePatientSignup";
import { AddressStep, PersonalDataStep, SecurityStep } from "./components";

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

export function Register() {
  const { mutateAsync, isPending } = useRegisterPatient();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: fetchAddressByCep } = useCep();
  const isGoogleSignup = location.pathname === "/cadastro/google";
  const {
    data: googleSignup,
    isError: isGoogleSignupError,
    isLoading: isGoogleSignupLoading,
  } = useGooglePendingSignup(isGoogleSignup);
  const completeGoogleSignup = useMutation({
    mutationFn: completeGooglePatientSignup,
  });

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

  useEffect(() => {
    if (!isGoogleSignup || !googleSignup) {
      return;
    }

    setValue("name", googleSignup.name, { shouldValidate: true });
    setValue("email", googleSignup.email, { shouldValidate: true });
    setValue("password", "Google@1234", { shouldValidate: true });
    setValue("confirmPassword", "Google@1234", { shouldValidate: true });
  }, [googleSignup, isGoogleSignup, setValue]);

  useEffect(() => {
    if (isGoogleSignupError) {
      toast.error("Não foi possível recuperar os dados do Google. Tente novamente.");
      navigate("/login");
    }
  }, [isGoogleSignupError, navigate]);

  async function handleRegister(data: RegisterSchema) {
    if (isGoogleSignup) {
      await completeGoogleSignup.mutateAsync({
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
      });

      toast.success("Cadastro realizado com sucesso.");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
      return;
    }

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

      setValue("address.street", address.logradouro, { shouldValidate: true });
      setValue("address.district", address.bairro, { shouldValidate: true });
      setValue("address.city", address.localidade, { shouldValidate: true });
      setValue("address.state", address.uf, { shouldValidate: true });
    } catch (error) {
      console.error(error);
    }
  }

  const isSubmitting = isPending || completeGoogleSignup.isPending;

  if (isGoogleSignup && isGoogleSignupLoading) {
    return (
      <section className="mx-auto w-full max-w-3xl p-6 text-left">
        <p>Carregando dados do Google...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl p-6 text-left">
      <FormWizard
        title={isGoogleSignup ? "Complete seu cadastro" : "Realize seu Cadastro"}
        subtitle="Preencha seus dados em etapas"
        color="#0094CB"
        nextButtonText="Próximo"
        backButtonText="Voltar"
        finishButtonText={isSubmitting ? "Cadastrando..." : "Finalizar Cadastro"}
        onComplete={handleSubmit(handleRegister)}
      >
        <FormWizard.TabContent title="Dados pessoais" icon={<User size={24} />}>
          <PersonalDataStep
            control={control}
            errors={errors}
            isGoogleSignup={isGoogleSignup}
            register={register}
          />
        </FormWizard.TabContent>

        <FormWizard.TabContent title="Endereço" icon={<AddressBook size={24} />}>
          <AddressStep
            control={control}
            errors={errors}
            onCepComplete={handleCepChange}
            register={register}
          />
        </FormWizard.TabContent>

        {!isGoogleSignup && (
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
        )}
      </FormWizard>

      <div className="flex pl-4">
        <Link to="/login" className="text-sm text-[#0094CB] hover:underline">
          Já tem uma conta? Faça login
        </Link>
      </div>
    </section>
  );
}
