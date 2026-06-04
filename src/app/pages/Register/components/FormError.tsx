import type { FieldError } from "react-hook-form";

type FormErrorProps = {
  error?: FieldError;
};

export function FormError({ error }: FormErrorProps) {
  if (!error) {
    return null;
  }

  return (
    <span className="min-h-5 text-left text-sm text-red-500">
      {error.message}
    </span>
  );
}
