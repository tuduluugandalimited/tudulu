// components/home/SearchSection.tsx
import { Container } from "@/components/ui/Container";
import { Search } from "lucide-react"; // Assuming you use lucide-react for icons

export function SearchSection() {
  return (
    <section className="relative -mt-8 z-20 pb-16">
      <Container size="md">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-4 sm:p-6 flex flex-col space-y-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="Search NGOs, grants, jobs, news..."
              className="w-full h-14 pl-14 pr-4 bg-slate-50 border-none rounded-xl text-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 px-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
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
                className="text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
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
