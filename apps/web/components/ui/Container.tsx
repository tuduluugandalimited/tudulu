import * as React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export function Container({
  size = "lg",
  className = "",
  children,
  ...props
}: ContainerProps) {
  const sizeMap = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeMap[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
