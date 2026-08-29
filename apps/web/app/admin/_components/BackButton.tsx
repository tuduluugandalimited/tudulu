import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({
  href = "/admin",
  label = "Back to Dashboard",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Link>
  );
}
