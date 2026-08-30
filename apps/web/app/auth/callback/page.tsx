// D:\tudulu\apps\web\app\auth\callback\page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("No authentication token found in the redirect URL.");
      return;
    }

    try {
      localStorage.setItem("accessToken", token);

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      const payload = JSON.parse(jsonPayload);

      const userEmail = (payload.email || "").toLowerCase().trim();
      const userRole = (payload.role || "").toUpperCase();

      if (userRole) {
        localStorage.setItem("userRole", userRole);
      }

      const isAdmin =
        userRole === "ADMIN" ||
        userRole === "SUPER_ADMIN" ||
        userEmail === "tuduluugandalimited@gmail.com" ||
        userEmail.includes("admin");

      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError("Failed to process authentication token.");
    }
  }, [searchParams, router]);

  return (
    <div className="max-w-md w-full bg-[var(--td-bg-surface-elevated)] p-8 rounded-2xl shadow-xl border border-[var(--td-border-subtle)] text-center space-y-4">
      {error ? (
        <>
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs">
            {error}
          </div>
          <button
            onClick={() => router.push("/auth/login")}
            className="py-2 px-4 bg-[var(--td-color-primary)] text-white text-xs font-bold rounded-xl"
          >
            Return to Login
          </button>
        </>
      ) : (
        <div className="space-y-2">
          <div className="w-8 h-8 border-4 border-[var(--td-color-primary)] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="text-sm font-bold text-[var(--td-text)]">
            Completing sign-in...
          </h2>
          <p className="text-xs text-[var(--td-text-muted)]">
            Please wait while we log you into Tudulu.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--td-bg-soft)] px-4">
      <Suspense
        fallback={
          <div className="text-xs text-[var(--td-text-muted)]">Loading...</div>
        }
      >
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}
