import "@/styles/app.css";
import type { ComponentProps, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "keyboard-focus box-border flex cursor-pointer items-center justify-center gap-2 font-inter text-sm uppercase outline-none transition-all duration-150 disabled:cursor-not-allowed",

  variants: {
    size: {
      default: "w-12 h-12 p-3 font-bold",
      xsm: "px-8 py-4 rounded-sm",
      sm: "px-6 py-4 rounded-sm",
      md: "px-8 py-3 rounded-md",
      lg: "px-8 py-3 rounded-md w-full",
      full: "h-14 w-full rounded-lg px-6 font-bold",
      action: "h-10 min-w-32 rounded-lg px-4 font-semibold",
      icon: "h-10 w-10 rounded-lg",
      tab: "px-3 pb-4 font-semibold",
      inputAction: "h-12 rounded-lg px-5 font-semibold",
      profile: "gap-3 py-2 pr-12",
      quickAction: "w-full rounded-2xl p-4",
    },

    variant: {
      primary:
        "bg-[#0094CB] text-white hover:bg-blue-700 disabled:bg-slate-400",

      blueOutline:
        "border border-blue-200 text-blue-600 hover:bg-blue-50 disabled:border-slate-200 disabled:text-slate-400",

      dangerOutline:
        "border border-red-200 text-red-600 hover:bg-red-50 disabled:border-slate-200 disabled:text-slate-400",

      neutralOutline:
        "border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50",

      page: "border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50",

      pageActive: "bg-blue-600 font-bold text-white",

      tab: "text-slate-500 hover:text-blue-600",

      tabActive: "border-b-2 border-blue-600 text-blue-600",

      ghost: "text-gray-500 hover:text-gray-700",

      profile: "text-[#0094CB]",

      quickAction:
        "justify-between border border-slate-100 text-left normal-case hover:bg-slate-50",
    },

    primary: {
      true: "bg-[#0094CB] text-white hover:bg-blue-700 disabled:bg-slate-400",
    },

    outlined: {
      true: "outline-1 outline-[white] rounded-md font-normal text-sm gap-3 text-white  hover:text-white transition-all",
    },

    error: {
      true: "outline-1 outline-[red] text-red-500 transition-all disabled:text-slate-400",
    },

    secondary: {
      true: "text-[#0094CB] border-2 border-[#0094CB] rounded-full hover:bg-[#0094CB] hover:text-white transition-all",
    },

    google: {
      true: "flex items-center gap-2 bg-white text-gray-700 border outline-gray-900 rounded-md ",
    },
  },
});

type ButtonBaseProps = VariantProps<typeof button> & {
  primary?: boolean;
  secondary?: boolean;
  error?: boolean;
  outlined?: boolean;
  children?: ReactNode;
  google?: boolean;
};

type NativeButtonProps = ComponentProps<"button"> &
  ButtonBaseProps & {
    to?: never;
  };

type LinkButtonProps = LinkProps &
  ButtonBaseProps & {
    to: string;
  };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

function isLinkButton(props: ButtonProps): props is LinkButtonProps {
  return typeof props.to === "string";
}

export function Button(props: ButtonProps) {
  const {
    primary,
    secondary,
    error,
    outlined,
    size,
    variant,
    className,
    children,
    google,
    ...rest
  } = props;

  const buttonClassName = twMerge(
    button({
      size,
      variant,
      primary,
      secondary,
      error,
      outlined,
      google,
    }),
    className,
  );

  if (isLinkButton(props)) {
    const linkProps = rest as Omit<LinkButtonProps, keyof ButtonBaseProps>;

    return (
      <Link className={buttonClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<NativeButtonProps, keyof ButtonBaseProps>;

  return (
    <button
      data-primary={primary}
      data-secondary={secondary}
      data-error={error}
      data-outlined={outlined}
      className={buttonClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export type DeprecatedButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    primary?: boolean;
    secondary?: boolean;
    error?: boolean;
    outlined?: boolean;
  };
