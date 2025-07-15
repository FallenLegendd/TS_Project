import React from "react";
import styles from "./Button.module.css";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  // loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  className,
  onClick = () => {},
  disabled = false,
  // loading = false,
}) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  return (
    <button
      className={`${buttonClass}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
