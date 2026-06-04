import { InputMask } from "@react-input/mask";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/Input/Input";
import type { RegisterSchema } from "@/schemas/RegisterSchema";
import { BRAZILIAN_STATES } from "../constants/states";
import { FormError } from "./FormError";

type AddressStepProps = {
  control: Control<RegisterSchema>;
  errors: FieldErrors<RegisterSchema>;
  onCepComplete: (cep: string) => void;
  register: UseFormRegister<RegisterSchema>;
};

export function AddressStep({
  control,
  errors,
  onCepComplete,
  register,
}: AddressStepProps) {
  return (
    <div className="mt-6 grid gap-4">
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
              onChange={(event) => {
                field.onChange(event);

                const cep = event.target.value.replace(/\D/g, "");

                if (cep.length === 8) {
                  onCepComplete(cep);
                }
              }}
            />
          )}
        />
        <FormError error={errors.address?.zipcode} />
      </div>

      <div className="flex flex-col gap-1">
        <Input size="md" placeholder="Rua" {...register("address.street")} />
        <FormError error={errors.address?.street} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Input
            size="md"
            placeholder="Bairro"
            {...register("address.district")}
          />
          <FormError error={errors.address?.district} />
        </div>

        <div className="flex flex-col gap-1">
          <Input size="md" placeholder="Cidade" {...register("address.city")} />
          <FormError error={errors.address?.city} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <select
            {...register("address.state")}
            className="w-full rounded-md border border-gray-300 px-4 py-3 font-inter text-base outline-none focus:border-[#0094CB]"
          >
            <option value="">Estado</option>

            {BRAZILIAN_STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          <FormError error={errors.address?.state} />
        </div>

        <div className="flex flex-col gap-1">
          <Input
            size="md"
            placeholder="Número"
            {...register("address.number")}
          />
          <FormError error={errors.address?.number} />
        </div>
      </div>
    </div>
  );
}
