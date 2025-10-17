import React from "react";
import { Eye, EyeOff } from "lucide-react";

type TextInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  className?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  minLength,
  className = "",
}) => (
  <div className="w-full">
    <label htmlFor={id} className="font-poppins text-[#666666] mb-2 block md:text text-sm ">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border-[#666666]/35 border rounded h-10 mb-3 px-3 w-full font-inter focus:scale-105 transition-all duration-150 md:focus:scale-101 ${className}`}
      required={required}
      minLength={minLength}
    />
  </div>
);

type PasswordInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggleShow: (v: boolean) => void;
  minLength?: number;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  show,
  onToggleShow,
  minLength,
}) => (
  <div className="w-full relative group focus-within:scale-101 transition-all duration-150">
    <label htmlFor={id} className="font-poppins text-[#666666] mb-2 block md:text text-sm ">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={show ? "text" : "password"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="***********"
      className="border-[#666666]/35 border rounded h-10 mb-3 px-3 pr-10 w-full font-inter focus:scale-105 transition-all duration-150 md:focus:scale-101"
      minLength={minLength}
      required
      
    />
       <button
         type="button"
         onPointerDown={(e) => e.preventDefault()}
         onClick={() => onToggleShow?.(!show)}
         aria-label={show ? "Hide password" : "Show password"}
         aria-pressed={show}
         className="absolute right-3 top-[60%] -translate-y-1/2 text-gray-500 group-focus-within:scale-105 transition-all duration-150 md:group-focus-within:scale-105"
       >
         {show ? <EyeOff size={23} /> : <Eye size={23} />}
       </button>
  </div>
);
