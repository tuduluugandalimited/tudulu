import * as React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg";
}

export function Section({
  spacing = "md",
  className = "",
  children,
  ...props
}: SectionProps) {
  const spacingMap = {
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-20",
    lg: "py-16 sm:py-28",
  };

  return (
    <section className={`${spacingMap[spacing]} ${className}`} {...props}>
      {children}
    </section>
  );
}
