import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "emerald"
    | "blue"
    | "slate"
    | "amber"
    | "default"
    | "outline"
    | "neutral";
}

export function Badge({
  className = "",
  variant = "emerald",
  children,
  ...props
}: BadgeProps) {
  const variantStyles: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    slate: "bg-slate-800 text-slate-300 border-slate-700",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    default: "bg-slate-800 text-slate-300 border-slate-700",
    outline: "bg-transparent text-slate-400 border-slate-700",
    neutral: "bg-slate-800 text-slate-300 border-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border tracking-wide uppercase ${
        variantStyles[variant] || variantStyles.slate
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
