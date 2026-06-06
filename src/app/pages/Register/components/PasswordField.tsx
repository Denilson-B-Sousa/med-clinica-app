import { Button } from "@/components/Button/Button";
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
      <Button
        type="button"
        onClick={onToggleVisibility}
        size="default"
        variant="ghost"
        className="absolute right-4 top-1/2 h-8 w-8 -translate-y-1/2 p-0"
      >
        {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
      </Button>
    </div>
  );
}
