import "@/styles/app.css";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex justify-center items-center uppercase font-inter font-bold cursor-pointer box-border transition-all duration-150",

  variants: {
    size: {
      default: "w-12 h-12 p-3 font-bold",
      sm: "px-6 py-4 rounded-sm",
      md: "px-8 py-4 rounded-md",
    },

    primary: {
      true: "bg-[#0094CB] text-white rounded-full",
    },

    secondary: {
      true: "text-[#0094CB] border-2 border-[#0094CB] rounded-full hover:bg-[#0094CB] hover:text-white transition-all",
    },
  },
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    primary?: boolean;
    secondary?: boolean;
  };

export function Button({ primary, secondary, size, ...props }: ButtonProps) {
  return (
    <button
      data-primary={primary}
      data-secondary={secondary}
      className={button({
        size,
        primary,
        secondary,
      })}
      {...props}
    >
      {props.children}
    </button>
  );
}
