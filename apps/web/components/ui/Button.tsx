import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "emerald" | "amber" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none td-touch-target";

    const variantStyles = {
      primary:
        "bg-[var(--td-color-primary)] text-white hover:bg-[var(--td-color-primary-hover)]",
      emerald:
        "bg-[var(--td-color-emerald)] text-white hover:bg-[var(--td-color-emerald-hover)]",
      amber:
        "bg-[var(--td-color-amber)] text-white hover:bg-[var(--td-color-amber-hover)]",
      outline:
        "border-2 border-[var(--td-border-strong)] text-[var(--td-text-primary)] hover:bg-[var(--td-bg-surface-elevated)]",
      ghost:
        "text-[var(--td-text-primary)] hover:bg-[var(--td-bg-surface-elevated)]",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
