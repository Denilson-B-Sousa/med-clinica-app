import "@/styles/app.css";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex justify-center items-center uppercase font-inter font-bold cursor-pointer box-border transition-all duration-150",

  variants: {
    size: {
      default: "w-12 h-12 p-3 font-bold",
      sm: "px-6 py-4 rounded-sm",
      md: "px-8 py-3 rounded-md",
    },

    primary: {
      true: "bg-[#0094CB] text-white",
    },

    secondary: {
      true: "text-[#0094CB] border-2 border-[#0094CB] rounded-full hover:bg-[#0094CB] hover:text-white transition-all",
    },

    google: {
      true: "flex items-center gap-2 bg-white text-gray-700 border outline-gray-900 rounded-md ",
    }
  },
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    primary?: boolean;
    secondary?: boolean;
  };

export function Button({ primary, secondary, google, size, ...props }: ButtonProps) {
  return (
    <button
      data-primary={primary}
      data-secondary={secondary}
      className={button({
        size,
        primary,
        secondary,
        google
      })}
      {...props}
    >
      {props.children}
    </button>
  );
}
