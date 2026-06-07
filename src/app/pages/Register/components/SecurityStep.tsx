import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { RegisterSchema } from "@/schemas/RegisterSchema";
import { FormError } from "./FormError";
import { PasswordField } from "./PasswordField";

type SecurityStepProps = {
  errors: FieldErrors<RegisterSchema>;
  isConfirmPasswordVisible: boolean;
  isPasswordVisible: boolean;
  onToggleConfirmPassword: () => void;
  onTogglePassword: () => void;
  register: UseFormRegister<RegisterSchema>;
};

export function SecurityStep({
  errors,
  isConfirmPasswordVisible,
  isPasswordVisible,
  onToggleConfirmPassword,
  onTogglePassword,
  register,
}: SecurityStepProps) {
  return (
    <div className="mt-6 grid gap-4">
      <div className="flex w-md flex-col gap-1">
        <label
          htmlFor="password"
          className="text-left font-inter text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <PasswordField
          id="password"
          isVisible={isPasswordVisible}
          onToggleVisibility={onTogglePassword}
          placeholder="Digite sua senha"
          {...register("password")}
        />
        <FormError error={errors.password} />
      </div>

      <div className="relative flex w-md flex-col gap-1">
        <label
          htmlFor="confirmPassword"
          className="text-left font-inter text-sm font-medium text-gray-700"
        >
          Confirmar senha
        </label>
        <PasswordField
          id="confirmPassword"
          isVisible={isConfirmPasswordVisible}
          onToggleVisibility={onToggleConfirmPassword}
          placeholder="Digite sua senha novamente"
          {...register("confirmPassword")}
        />
        <FormError error={errors.confirmPassword} />
      </div>
    </div>
  );
}
