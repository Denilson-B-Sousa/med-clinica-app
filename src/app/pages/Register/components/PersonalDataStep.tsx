import { InputMask } from "@react-input/mask";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/Input/Input";
import type { RegisterSchema } from "@/schemas/RegisterSchema";
import { FormError } from "./FormError";

type PersonalDataStepProps = {
  control: Control<RegisterSchema>;
  errors: FieldErrors<RegisterSchema>;
  isGoogleSignup?: boolean;
  register: UseFormRegister<RegisterSchema>;
};

export function PersonalDataStep({
  control,
  errors,
  isGoogleSignup = false,
  register,
}: PersonalDataStepProps) {
  return (
    <div className="mt-6 grid gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="name"
          className="text-left font-inter text-sm font-medium text-gray-700"
        >
          Nome completo
        </label>
        <Input
          id="name"
          size="md"
          readOnly={isGoogleSignup}
          placeholder="Digite seu nome completo"
          {...register("name")}
        />
        <FormError error={errors.name} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="cpf"
            className="text-left font-inter text-sm font-medium text-gray-700"
          >
            CPF
          </label>
          <Controller
            control={control}
            name="cpf"
            render={({ field }) => (
              <InputMask
                id="cpf"
                component={Input}
                mask="___.___.___-__"
                replacement={{ _: /\d/ }}
                size="md"
                placeholder="000.000.000-00"
                {...field}
              />
            )}
          />
          <FormError error={errors.cpf} />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="phone"
            className="text-left font-inter text-sm font-medium text-gray-700"
          >
            Telefone
          </label>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <InputMask
                id="phone"
                component={Input}
                mask="(__) _____-____"
                replacement={{ _: /\d/ }}
                size="md"
                placeholder="(00) 00000-0000"
                {...field}
              />
            )}
          />
          <FormError error={errors.phone} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-left font-inter text-sm font-medium text-gray-700"
        >
          E-mail
        </label>
        <Input
          id="email"
          size="md"
          type="email"
          readOnly={isGoogleSignup}
          placeholder="seuemail@exemplo.com"
          {...register("email")}
        />
        <FormError error={errors.email} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="birthDate"
            className="text-left font-inter text-sm font-medium text-gray-700"
          >
            Data de nascimento
          </label>
          <Input
            id="birthDate"
            size="md"
            type="date"
            placeholder="Data de nascimento"
            {...register("birthDate")}
          />
          <FormError error={errors.birthDate} />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="gender"
          className="text-left font-inter text-sm font-medium text-gray-700"
        >
            Sexo biológico
          </label>
          <select
            id="gender"
            {...register("gender")}
            className="form-field-focus w-full rounded-md border border-gray-300 px-4 py-3 font-inter text-base outline-none transition-all duration-200"
          >
            <option value="">Selecione o Sexo Biológico</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>
          <FormError error={errors.gender} />
        </div>
      </div>
    </div>
  );
}
