// D:\tudulu\apps\web\app\auth\login\page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Relative path routes through Next.js proxy rewrite -> BACKEND_URL/api/v1/auth/login
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const textResponse = await res.text();
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch {
        throw new Error(
          `Server returned invalid response (${res.status}): ${textResponse.slice(0, 100)}`,
        );
      }

      if (!res.ok) {
        throw new Error(
          data.message || "Invalid email or password. Please try again.",
        );
      }

      const token = data.accessToken || data.access_token || data.token;
      if (!token) {
        throw new Error(
          "Authentication response did not contain an access token.",
        );
      }

      localStorage.setItem("accessToken", token);

      // Extract user object and role safely across different payload structures
      const userObj = data.user || data.profile || data;
      const userRole = userObj?.role || data.role;
      const userEmail = (userObj?.email || email).toLowerCase().trim();

      if (userRole) {
        localStorage.setItem("userRole", userRole);
      }

      // Check strictly if the user is an administrator
      const normalizedRole = (userRole || "").toUpperCase();
      const isAdmin =
        normalizedRole === "ADMIN" ||
        normalizedRole === "SUPER_ADMIN" ||
        userEmail === "tuduluugandalimited@gmail.com" ||
        userEmail.includes("admin");

      // Directly target the main Admin Control Center (/admin)
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      if (err.name === "TypeError" && err.message === "Failed to fetch") {
        setError(
          "Unable to connect to service. The backend server may be starting up, please try again in a moment.",
        );
      } else {
        setError(err.message || "Invalid email or password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Relative endpoint through rewrite proxy or public oauth handler
    window.location.href = "/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--td-bg-soft)] px-4 py-12">
      <div className="max-w-md w-full space-y-6 bg-[var(--td-bg-surface-elevated)] p-8 rounded-2xl shadow-xl border border-[var(--td-border-subtle)]">
        {/* Header Logo & Brand */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Tudulu"
              width={180}
              height={36}
              className="h-10 w-auto mx-auto object-contain dark:invert"
              priority
            />
          </Link>
          <h2 className="text-xl font-bold text-[var(--td-text)]">
            Sign in to your account
          </h2>
          <p className="text-xs text-[var(--td-text-muted)]">
            Access intelligence, grants, and platform tools
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs leading-relaxed">
            {error}
          </div>
        )}

        {/* Google OAuth Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-[var(--td-bg-surface-elevated)] hover:bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-xs font-semibold text-[var(--td-text)] transition-all shadow-xs cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-[var(--td-border-subtle)]"></div>
          <span className="px-3 text-[10px] text-[var(--td-text-muted)] uppercase tracking-wider">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-[var(--td-border-subtle)]"></div>
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="email-address"
                className="block text-xs font-semibold text-[var(--td-text-light)] mb-1"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] focus:ring-2 focus:ring-[var(--td-color-primary)]/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[var(--td-text-light)] mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-xs bg-[var(--td-bg-soft)] border border-[var(--td-border-subtle)] rounded-xl text-[var(--td-text)] focus:outline-none focus:border-[var(--td-color-primary)] focus:ring-2 focus:ring-[var(--td-color-primary)]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[var(--td-color-primary)] focus:ring-[var(--td-color-primary)] border-[var(--td-border-subtle)] rounded cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-[var(--td-text-muted)] cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <Link
              href="/auth/forgot-password"
              className="font-semibold text-[var(--td-color-primary)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 border border-transparent rounded-xl text-xs font-bold text-[var(--td-text-inverse)] bg-[var(--td-color-primary)] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--td-color-primary)] transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Sign in with Email"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-[var(--td-text-muted)] pt-2">
          Don&apos;t have an account?{" "}
          <Link
            href="/contact"
            className="font-semibold text-[var(--td-color-primary)] hover:underline"
          >
            Contact partner support
          </Link>
        </div>
      </div>
    </div>
  );
}
