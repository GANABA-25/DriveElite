import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  onClick,
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseClass =
    "px-4 py-2 rounded-md text-base font-bold transition-transform duration-200 ease-in-out lg:hover:cursor-pointer";
  const variants = {
    primary: "bg-primary text-black hover:bg-yellow-500 hover:scale-105",
    secondary:
      "bg-white text-black border border-gray-300 hover:bg-gray-100 hover:scale-105",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
