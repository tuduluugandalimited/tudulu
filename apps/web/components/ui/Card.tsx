import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({
  hoverable,
  className = "",
  children,
  ...props
}: CardProps) {
  const hoverStyles = hoverable
    ? "transition-all duration-200 hover:border-slate-300 hover:shadow-md"
    : "";

  return (
    <div
      className={`bg-white border border-slate-200 rounded-2xl ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
