import "@/styles/app.css";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex justify-center items-center gap-2 uppercase font-inter text-sm cursor-pointer box-border transition-all duration-150",

  variants: {
    size: {
      default: "w-12 h-12 p-3 font-bold",
      xsm: "px-8 py-4 rounded-sm",
      sm: "px-6 py-4 rounded-sm",
      md: "px-8 py-3 rounded-md",
      lg: "px-8 py-3 rounded-md w-full",
    },

    primary: {
      true: "bg-[#0094CB] text-white",
    },

    outlined: {
      true: "outline-1 outline-[white] rounded-md font-normal text-sm gap-3 text-white  hover:text-white transition-all",
    },

    error: {
      true: "outline-1 outline-[red] text-red-500 transition-all",
    },

    secondary: {
      true: "text-[#0094CB] border-2 border-[#0094CB] rounded-full hover:bg-[#0094CB] hover:text-white transition-all",
    },

    google: {
      true: "flex items-center gap-2 bg-white text-gray-700 border outline-gray-900 rounded-md ",
    },
  },
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    primary?: boolean;
    secondary?: boolean;
    error?: boolean;
    outlined?: boolean;
  };

export function Button({ primary, secondary, error, outlined, size, ...props }: ButtonProps) {
  return (
    <button
      data-primary={primary}
      data-secondary={secondary}
      data-error={error}
      data-outlined={outlined}
      className={button({
        size,
        primary,
        secondary,
        error,
        outlined
      })}
      {...props}
    >
      {props.children}
    </button>
  );
}
