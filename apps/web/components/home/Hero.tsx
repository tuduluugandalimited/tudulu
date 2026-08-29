"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  DollarSign,
  Users,
  Calendar,
  Newspaper,
  Heart,
  Search,
} from "lucide-react";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/opportunities?search=${encodeURIComponent(searchQuery.trim())}`,
      );
    }
  };

  const categories = [
    {
      label: "Jobs",
      icon: Briefcase,
      href: "/jobs",
      bgColor: "bg-[#1e293b]",
      iconColor: "text-white",
    },
    {
      label: "Grants",
      icon: DollarSign,
      href: "/opportunities",
      bgColor: "bg-[#16a34a]",
      iconColor: "text-white",
    },
    {
      label: "Organizations",
      icon: Users,
      href: "/organizations",
      bgColor: "bg-[#0f172a]",
      iconColor: "text-white",
    },
    {
      label: "Events",
      icon: Calendar,
      href: "/events",
      bgColor: "bg-[#f97316]",
      iconColor: "text-white",
    },
    {
      label: "News",
      icon: Newspaper,
      href: "/news",
      bgColor: "bg-[#6366f1]",
      iconColor: "text-white",
    },
    {
      label: "Volunteering",
      icon: Heart,
      href: "/volunteering",
      bgColor: "bg-[#0d3b2e]",
      iconColor: "text-white",
    },
  ];

  return (
    <section className="bg-[var(--td-bg,#ffffff)] pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Title & Subtitle */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0d3b2e] tracking-tight">
          Find. Connect. Grow.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium">
          All the opportunities Africa has to offer.
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for jobs, grants, events, organizations..."
              className="w-full pl-12 pr-6 py-3.5 text-sm md:text-base bg-white border border-slate-200 rounded-full shadow-xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0d3b2e]/20 focus:border-[#0d3b2e] text-slate-800 placeholder:text-slate-400 transition-all"
            />
          </div>
        </form>

        {/* Category Navigation Cards */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${cat.bgColor} ${cat.iconColor}`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>
                <span className="mt-3 text-xs font-bold text-slate-800">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 relative overflow-hidden rounded-3xl bg-[#071d17] text-white p-8 sm:p-12 md:p-14 text-left max-w-5xl mx-auto shadow-lg min-h-[280px] sm:min-h-[320px] flex items-center">
          <div className="relative z-10 max-w-lg space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              One Platform.
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-[#f59e0b]">
              Many Opportunities.
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              Infinite Impact.
            </h2>
          </div>

          {/* Sunset / Africa Map Image Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 opacity-95 pointer-events-none">
            <Image
              src="/images/africa-sunset.png"
              alt="Africa Impact Graphic"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071d17] via-[#071d17]/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
