import React from "react";
import styles from "./Input.module.css";

type Props = {
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  size = "medium",
  disabled = false,
  className,
  name,
  required,
}) => {
  const inputClass = `${styles.input} ${styles[type]} ${styles[size]} ${className}`;
  return (
    <input
      className={`${inputClass}`}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
    />
  );
};
