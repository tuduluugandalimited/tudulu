"use client";

import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function PendingReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Application Submitted!
          </h1>
          <p className="text-sm text-gray-600">
            Thank you for registering your organization on Tudulu. Your
            application and administrator account are currently pending review
            by our verification team.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-xs text-emerald-800 text-left space-y-1">
          <p className="font-semibold">What happens next?</p>
          <p>
            1. Our compliance team verifies your legal/registration details.
          </p>
          <p>
            2. Upon approval, your designated administrator will receive a
            confirmation email to access the organization dashboard.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 text-white font-medium py-2.5 px-4 rounded-md text-sm hover:bg-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
