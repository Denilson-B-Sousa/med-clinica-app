import "@/styles/app.css";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex justify-center items-center uppercase font-inter font-bold tracking-widest cursor-pointer box-border transition-all duration-150",

  variants: {
    size: {
      default: "w-12 h-12 p-3 font-bold",
      sm: "w-10 h-10 p-3",
      md: "px-6 py-3.5 rounded-sm my-6",
      primary: "flex justify-center items-center p-2 md:px-4 rounded",
    },

    primary: {
      true: "",
    },

    secondary: {
      true: "",
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
