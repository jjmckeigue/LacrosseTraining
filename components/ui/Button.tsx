import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline-light" | "outline-dark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-accent-deep hover:text-paper",
  "outline-light":
    "border border-line-invert text-paper hover:border-paper hover:bg-white/5",
  "outline-dark": "border border-line text-ink hover:border-ink",
};

type ButtonOwnProps = {
  variant?: Variant;
  className?: string;
};

type LinkButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonOwnProps> & {
    href: string;
  };

type NativeButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps> & {
    href?: never;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
