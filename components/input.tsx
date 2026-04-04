import { Eye, EyeOff } from "lucide-react";
import type { ReactNode } from "react";

type InputProps = {
  label?: string;
  id?: number;
  type: string;
  name: string;
  value: string | number;
  onClick?: () => void;
  placeholder: string;
  hasError?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  icon: ReactNode;
};

export default function Input({
  label,
  id,
  type,
  name,
  value,
  onClick,
  placeholder,
  hasError,
  onChange,
  showPassword,
  onTogglePassword,
  icon,
}: InputProps) {
  const isPasswordField =
    type === "password" || name?.toLowerCase()?.includes("password");

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-base text-gray-600">{label}</label>

      <div className="relative text-base">
        <input
          className={`w-full bg-grayDark rounded-sm border border-gray-300 
          p-2 md:p-4 lg:p-2 pl-8 md:pl-8 lg:pl-9 
          focus:outline-none focus:ring-2 focus:ring-opacity-30
          ${
            hasError
              ? "focus:ring-red-600 border-2 border-red-600"
              : "focus:ring-[#FACC15]"
          }`}
          key={id}
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          name={name}
          value={value}
          onClick={onClick}
          placeholder={placeholder}
          onChange={onChange}
        />

        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        {isPasswordField && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 
            text-gray-500 hover:text-accent"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 cursor-pointer" />
            ) : (
              <Eye className="w-5 h-5 cursor-pointer" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
