import { upcomingPatients } from "../../data/mockData";

export default function UpcomingQueue() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-base font-semibold text-slate-900">
          Upcoming Queue
        </span>
        <span className="text-sm font-semibold text-slate-500">12 IN LINE</span>
      </div>
      <div className="flex max-h-[420px] flex-1 flex-col gap-1 overflow-auto">
        {upcomingPatients.map((p) => (
          <div
            key={p.id}
            className={`flex items-center justify-between rounded-xl px-3 py-3 ${
              p.next
                ? "border border-teal-200 bg-teal-50"
                : "border border-transparent"
            }`}
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">{p.id}</p>
              <p className="mt-0.5 text-xs text-slate-500">{p.name}</p>
            </div>
            <div className="text-right">
              {p.next && (
                <p className="text-xs font-semibold text-teal-700">NEXT</p>
              )}
              <p
                className={`text-sm font-semibold ${p.next ? "text-teal-700" : "text-slate-700"}`}
              >
                {p.wait}
              </p>
              {p.next && <p className="text-xs text-slate-400">WAIT</p>}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-5 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
        View Entire Queue
      </button>
    </div>
  );
}
