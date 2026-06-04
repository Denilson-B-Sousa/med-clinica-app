import { Input } from "@/components/Input/Input";
import { Eye, EyeSlash } from "phosphor-react";
import type { ComponentPropsWithoutRef } from "react";

type PasswordFieldProps = ComponentPropsWithoutRef<typeof Input> & {
  isVisible: boolean;
  onToggleVisibility: () => void;
};

export function PasswordField({
  isVisible,
  onToggleVisibility,
  ...inputProps
}: PasswordFieldProps) {
  return (
    <div className="relative">
      <Input size="md" type={isVisible ? "text" : "password"} {...inputProps} />
      <button
        type="button"
        onClick={onToggleVisibility}
        className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
      >
        {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
