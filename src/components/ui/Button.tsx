import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "border border-accent text-accent hover:bg-accent-light",
  ghost:
    "text-accent hover:bg-accent-light",
};

export default function Button({
  variant = "primary",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${variantStyles[variant]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
