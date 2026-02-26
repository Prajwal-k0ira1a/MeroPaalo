import { BarChart3 } from "lucide-react";

export default function SessionSummary({ servedToday = 0, avgServiceMinutes = 0 }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <BarChart3 size={16} className="text-slate-600" />
        <span className="text-base font-semibold text-slate-900">
          Session Summary
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-wide text-slate-500">
            SERVED TODAY
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{servedToday}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-wide text-slate-500">
            AVG. SERVICE
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{avgServiceMinutes}m</p>
        </div>
      </div>
    </div>
  );
}
