import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
    <div className="flex items-center gap-1">
      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
        <ChevronLeft size={14} />
      </button>
      {["1", "2", "3"].map((page) => (
        <button
          key={page}
          className={`h-8 w-8 rounded-lg border text-sm font-medium ${
            page === "1"
              ? "border-teal-600 bg-teal-600 text-white"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {page}
        </button>
      ))}
      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
