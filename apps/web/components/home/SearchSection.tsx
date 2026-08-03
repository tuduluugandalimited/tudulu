// D:\tudulu\apps\web\components\home\SearchSection.tsx

import { Container } from "@/components/ui/Container";
import { Search } from "lucide-react";

export function SearchSection() {
  return (
    <section className="relative -mt-8 z-20 pb-16">
      <Container size="md">
        <div className="bg-[var(--td-bg-surface-elevated)] rounded-[var(--td-radius-lg)] shadow-xl shadow-slate-200/50 border border-[var(--td-border-subtle)] p-4 sm:p-6 flex flex-col space-y-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-6 h-6 text-[var(--td-text-muted)]" />
            <input
              type="text"
              placeholder="Search NGOs, grants, jobs, news..."
              className="w-full h-14 pl-14 pr-4 bg-[var(--td-bg-soft)] border-none rounded-[var(--td-radius-md)] text-lg text-[var(--td-text)] placeholder:text-[var(--td-text-muted)] focus:ring-2 focus:ring-[var(--td-color-primary)] focus:bg-[var(--td-bg-surface-elevated)] transition-all outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 px-2">
            <span className="text-xs font-semibold text-[var(--td-text-muted)] uppercase tracking-wider mr-2">
              Trending:
            </span>
            {[
              "Grants",
              "HealthTech",
              "USAID",
              "Climate Change",
              "Tech Jobs",
            ].map((tag) => (
              <button
                key={tag}
                className="text-xs sm:text-sm px-3 py-1 bg-[var(--td-bg-soft)] hover:bg-[var(--td-border-subtle)] text-[var(--td-text-light)] rounded-full transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
