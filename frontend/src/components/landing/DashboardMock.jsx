import { TrendingUp, Users, Clock } from "lucide-react";

const queueData = [
  {
    initials: "RK",
    name: "Ramesh K.",
    service: "Account Opening",
    status: "Serving",
  },
  {
    initials: "SP",
    name: "Sita P.",
    service: "Cash Deposit",
    status: "Waiting",
  },
  { initials: "HB", name: "Hari B.", service: "Inquiry", status: "Waiting" },
];

export default function DashboardMock() {
  return (
    <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/15 animate-float border border-slate-200/80 bg-white">
      {/* Chrome Bar */}
      <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 bg-slate-200/70 rounded-md h-5 flex items-center justify-center">
          <span className="text-[9px] text-slate-400 font-mono font-semibold tracking-wide">
            meropaalo.com/dashboard
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 bg-white border-b border-slate-100">
        {[
          {
            icon: <Users size={13} className="text-teal-600" />,
            label: "Waiting",
            value: "12",
          },
          {
            icon: <TrendingUp size={13} className="text-blue-500" />,
            label: "Served",
            value: "45",
          },
          {
            icon: <Clock size={13} className="text-violet-500" />,
            label: "Avg Wait",
            value: "8m",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="px-3 py-3 flex flex-col items-center gap-0.5"
          >
            <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {s.icon} {s.label}
            </div>
            <div className="text-2xl font-black text-slate-800 leading-tight">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Queue List */}
      <div className="divide-y divide-slate-50">
        {queueData.map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50/70 transition-colors"
          >
            <div
              className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-[11px] font-bold text-white shadow-sm ${
                row.status === "Serving"
                  ? "bg-linear-to-br from-teal-500 to-teal-600"
                  : "bg-linear-to-br from-slate-300 to-slate-400"
              }`}
            >
              {row.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {row.name}
              </p>
              <p className="text-xs text-slate-400 truncate">{row.service}</p>
            </div>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide ${
                row.status === "Serving"
                  ? "bg-teal-50 text-teal-700 border border-teal-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest">
          Live • Updated just now
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400 animate-pulse" />
      </div>
    </div>
  );
}
