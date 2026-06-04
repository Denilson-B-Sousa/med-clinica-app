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
        <PasswordField
          isVisible={isPasswordVisible}
          onToggleVisibility={onTogglePassword}
          placeholder="Senha"
          {...register("password")}
        />
        <FormError error={errors.password} />
      </div>

      <div className="relative flex w-md flex-col gap-1">
        <PasswordField
          isVisible={isConfirmPasswordVisible}
          onToggleVisibility={onToggleConfirmPassword}
          placeholder="Confirmar senha"
          {...register("confirmPassword")}
        />
        <FormError error={errors.confirmPassword} />
      </div>
    </div>
  );
}
