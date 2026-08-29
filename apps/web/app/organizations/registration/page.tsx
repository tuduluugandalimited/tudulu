// D:\tudulu\apps\web\app\organizations\registration\page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchMetadata } from "@/services/metadataService";
import {
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  MapPin,
  Mail,
  Phone,
  Globe,
  FileText,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default function OrganizationRegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingMeta, setFetchingMeta] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic Lookup States
  const [organizationTypes, setOrganizationTypes] = useState<
    { label: string; value: string }[]
  >([]);
  const [focusAreasList, setFocusAreasList] = useState<string[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    acronym: "",
    organizationType: "",
    registrationNumber: "",
    country: "Uganda",
    district: "",
    city: "",
    address: "",
    description: "",
    focusAreas: [] as string[],
    email: "",
    phone: "",
    website: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function loadOptions() {
      try {
        const data = await fetchMetadata();
        setOrganizationTypes(data.organizationTypes || []);
        setFocusAreasList(data.focusAreas || []);
        if (data.organizationTypes?.length > 0) {
          setFormData((prev) => ({
            ...prev,
            organizationType: data.organizationTypes[0].value,
          }));
        }
      } catch (err: any) {
        setError("Could not load form choices from the server.");
      } finally {
        setFetchingMeta(false);
      }
    }
    loadOptions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (area: string) => {
    setFormData((prev) => {
      const exists = prev.focusAreas.includes(area);
      return {
        ...prev,
        focusAreas: exists
          ? prev.focusAreas.filter((a) => a !== area)
          : [...prev.focusAreas, area],
      };
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (
        !formData.name ||
        !formData.organizationType ||
        !formData.country ||
        !formData.email
      ) {
        setError("Please fill in all required fields marked with *");
        return;
      }
    } else if (step === 2) {
      if (!formData.description) {
        setError("Please provide a brief description of your organization.");
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 12) {
      setError("Password must be at least 12 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/organizations/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed.");

      router.push("/organizations/pending-review");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingMeta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--td-bg-soft,#f8fafc)]">
        <div className="flex items-center gap-2 text-xs text-[var(--td-text-muted)]">
          <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          Loading registration configuration...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--td-bg-soft,#f8fafc)] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full">
        {/* Top Header & Branding */}
        <div className="text-center mb-8 space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--td-color-primary)]/10 text-[var(--td-color-primary)] text-xs font-semibold mb-2"
          >
            <Sparkles className="w-3.5 h-3.5" /> Tudulu Partner Network
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--td-text,#0f172a)] tracking-tight">
            Register Your Organization
          </h1>
          <p className="text-xs sm:text-sm text-[var(--td-text-muted)] max-w-md mx-auto">
            Join Africa's trusted ecosystem network to publish opportunities,
            connect with innovators, and scale your impact.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[var(--td-bg-surface,#ffffff)] rounded-2xl border border-[var(--td-border-subtle)] shadow-sm overflow-hidden p-6 sm:p-8">
          {/* Step Progress Bar Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--td-text-muted)] mb-2">
              <span
                className={
                  step >= 1 ? "text-[var(--td-color-primary)] font-bold" : ""
                }
              >
                1. Organization Info
              </span>
              <span
                className={
                  step >= 2 ? "text-[var(--td-color-primary)] font-bold" : ""
                }
              >
                2. Profile & Focus
              </span>
              <span
                className={
                  step >= 3 ? "text-[var(--td-color-primary)] font-bold" : ""
                }
              >
                3. Admin Account
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--td-color-primary)] transition-all duration-300"
                style={{
                  width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                }}
              />
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Basic Details */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. AfriAgri Tech Hub"
                    required
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    Acronym / Short Name
                  </label>
                  <input
                    type="text"
                    name="acronym"
                    value={formData.acronym}
                    onChange={handleChange}
                    placeholder="e.g. AATH"
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    Organization Type *
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  >
                    {organizationTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    Registration / License Number
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g. REG-2024-9981"
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    District / Region
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="e.g. Kampala"
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Kampala"
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    Official Contact Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@organization.org"
                    required
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+256 700 000000"
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--td-color-primary)] hover:bg-[var(--td-color-primary-hover)] text-white text-xs font-bold transition shadow-sm flex items-center gap-2"
                >
                  Continue to Profile <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Profile & Focus Areas */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                  Organization Bio / Description *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your organization's core mission, initiatives, and impact across the community..."
                  required
                  className="w-full rounded-xl border border-[var(--td-border-subtle)] p-3 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourorganization.org"
                  className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--td-text)] mb-2">
                  Focus Areas & Sectors
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-xl border border-[var(--td-border-subtle)] bg-gray-50/50 max-h-48 overflow-y-auto">
                  {focusAreasList.map((area) => (
                    <label
                      key={area}
                      className="flex items-center space-x-2 text-xs text-[var(--td-text)] cursor-pointer p-1.5 rounded-lg hover:bg-white transition"
                    >
                      <input
                        type="checkbox"
                        checked={formData.focusAreas.includes(area)}
                        onChange={() => handleCheckboxChange(area)}
                        className="rounded border-gray-300 text-[var(--td-color-primary)] focus:ring-[var(--td-color-primary)] w-3.5 h-3.5"
                      />
                      <span className="truncate">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2.5 rounded-xl border border-[var(--td-border-subtle)] text-[var(--td-text)] text-xs font-bold hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--td-color-primary)] hover:bg-[var(--td-color-primary-hover)] text-white text-xs font-bold transition shadow-sm flex items-center gap-2"
                >
                  Continue to Security <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Admin Account & Security */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                  Administrator Email *
                </label>
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  placeholder="admin@organization.org"
                  required
                  className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    Secure Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 12 characters"
                    required
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--td-text)] mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    required
                    className="w-full rounded-xl border border-[var(--td-border-subtle)] px-3 py-2 text-xs text-[var(--td-text)] bg-white focus:outline-none focus:border-[var(--td-color-primary)]"
                  />
                </div>
              </div>
              <p className="text-[11px] text-[var(--td-text-muted)]">
                Password must contain at least 12 characters to ensure secure
                administrative access.
              </p>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={loading}
                  className="px-4 py-2.5 rounded-xl border border-[var(--td-border-subtle)] text-[var(--td-text)] text-xs font-bold hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[var(--td-color-primary)] hover:bg-[var(--td-color-primary-hover)] text-white text-xs font-bold transition shadow-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Complete Registration <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Support Link */}
        <div className="text-center mt-6 text-xs text-[var(--td-text-muted)]">
          Already registered?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-[var(--td-color-primary)] hover:underline"
          >
            Sign in to your dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
