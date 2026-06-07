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
        <label
          htmlFor="zipcode"
          className="text-left font-inter text-sm font-medium text-gray-700"
        >
          CEP
        </label>
        <Controller
          control={control}
          name="address.zipcode"
          render={({ field }) => (
            <InputMask
              id="zipcode"
              component={Input}
              mask="_____-___"
              replacement={{ _: /\d/ }}
              size="md"
              placeholder="00000-000"
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
        <label
          htmlFor="street"
          className="text-left font-inter text-sm font-medium text-gray-700"
        >
          Rua
        </label>
        <Input
          id="street"
          size="md"
          placeholder="Digite sua rua"
          {...register("address.street")}
        />
        <FormError error={errors.address?.street} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="district"
            className="text-left font-inter text-sm font-medium text-gray-700"
          >
            Bairro
          </label>
          <Input
            id="district"
            size="md"
            placeholder="Digite seu bairro"
            {...register("address.district")}
          />
          <FormError error={errors.address?.district} />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="city"
            className="text-left font-inter text-sm font-medium text-gray-700"
          >
            Cidade
          </label>
          <Input
            id="city"
            size="md"
            placeholder="Digite sua cidade"
            {...register("address.city")}
          />
          <FormError error={errors.address?.city} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="state"
            className="text-left font-inter text-sm font-medium text-gray-700"
          >
            Estado
          </label>
          <select
            id="state"
            {...register("address.state")}
            className="form-field-focus w-full rounded-md border border-gray-300 px-4 py-3 font-inter text-base outline-none transition-all duration-200"
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
          <label
            htmlFor="number"
            className="text-left font-inter text-sm font-medium text-gray-700"
          >
            Número
          </label>
          <Input
            id="number"
            size="md"
            placeholder="Digite o número"
            {...register("address.number")}
          />
          <FormError error={errors.address?.number} />
        </div>
      </div>
    </div>
  );
}
