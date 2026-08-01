// components/ui/Logo.tsx
import Link from "next/link";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className = "h-9", showWordmark = true }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Tudulu Network Icon Mark */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="512" height="512" rx="112" fill="#FFFFFF" />
        <path
          d="M128 176V160C128 142.327 142.327 128 160 128H176"
          stroke="#15803D"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <path
          d="M336 128H352C369.673 128 384 142.327 384 160V176"
          stroke="#15803D"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <path
          d="M384 336V352C384 369.673 369.673 384 352 384H336"
          stroke="#15803D"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <path
          d="M176 384H160C142.327 384 128 369.673 128 352V336"
          stroke="#15803D"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <path
          d="M256 160V216"
          stroke="#15803D"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M256 296V352"
          stroke="#15803D"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M160 256H216"
          stroke="#15803D"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M296 256H352"
          stroke="#15803D"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <circle cx="256" cy="128" r="32" fill="#15803D" />
        <circle cx="384" cy="256" r="32" fill="#15803D" />
        <circle cx="256" cy="384" r="32" fill="#15803D" />
        <circle cx="128" cy="256" r="32" fill="#15803D" />
        <circle cx="256" cy="256" r="40" fill="#D97706" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex items-baseline font-extrabold tracking-tight text-2xl">
          <span className="text-slate-900 dark:text-white">tudulu</span>
          <span className="w-2 h-2 rounded-full bg-[#D97706] ml-0.5" />
        </div>
      )}
    </Link>
  );
}
