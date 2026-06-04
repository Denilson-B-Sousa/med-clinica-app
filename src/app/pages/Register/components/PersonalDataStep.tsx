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
  register: UseFormRegister<RegisterSchema>;
};

export function PersonalDataStep({
  control,
  errors,
  register,
}: PersonalDataStepProps) {
  return (
    <div className="mt-6 grid gap-4">
      <div className="flex flex-col gap-1">
        <Input size="md" placeholder="Nome completo" {...register("name")} />
        <FormError error={errors.name} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <FormError error={errors.cpf} />
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
          <FormError error={errors.phone} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          size="md"
          type="email"
          placeholder="E-mail"
          {...register("email")}
        />
        <FormError error={errors.email} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Input
            size="md"
            type="date"
            placeholder="Data de nascimento"
            {...register("birthDate")}
          />
          <FormError error={errors.birthDate} />
        </div>

        <div className="flex flex-col gap-1">
          <select
            {...register("gender")}
            className="w-full rounded-md border border-gray-300 px-4 py-3 font-inter text-base outline-none focus:border-[#0094CB]"
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
