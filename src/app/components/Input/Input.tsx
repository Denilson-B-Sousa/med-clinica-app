import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

const input = tv({
  base: "form-field-focus w-full cursor-pointer border box-border font-inter outline-none transition-all duration-200",

  variants: {
    variant: {
      default: "border-gray-300",
      outlined: "border-2 border-[#0094CB] bg-transparent",
      filled: "bg-gray-100 border-transparent focus:bg-white",
    },

    size: {
      sm: "px-3 py-2 text-sm rounded-sm",
      md: "px-4 py-3 text-base rounded-md ",
      lg: "px-5 py-4 text-lg rounded-lg",
    },

    state: {
      default: "",
      error: "border-red-500",
      success: "border-green-500",
    },

    disabled: {
      true: "bg-gray-200 cursor-not-allowed opacity-60",
    },
  },

  defaultVariants: {
    variant: "default",
    size: "md",
    state: "default",
  },
});

type InputVariants = VariantProps<typeof input>;

export type InputProps = Omit<ComponentProps<"input">, "size"> & InputVariants;

export function Input({
  variant,
  size,
  state,
  disabled,
  ...props
}: InputProps) {
  return (
    <input
      className={input({ variant, size, state, disabled })}
      disabled={disabled}
      {...props}
    />
  );
}
