import { Clock3 } from "lucide-react";
import HistoryChart from "./HistoryChart";

export default function ServiceHistoryPage({ historyRecords = [], avgServiceMinutes = 0, loading }) {
  return (
    <div className="flex-1">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Service History</h1>
          <p className="mt-1 text-sm text-slate-500">Completed service records for your department.</p>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_260px]">
        <HistoryChart />
        <div className="flex flex-col justify-between rounded-2xl bg-teal-600 p-6 text-white">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm opacity-90">
              <Clock3 size={14} />
              Avg. Service Time
            </p>
            <p className="text-4xl font-black leading-none sm:text-5xl">
              {avgServiceMinutes} <span className="text-lg font-normal">mins</span>
            </p>
          </div>
          <div className="mt-6 inline-flex self-start rounded-full bg-black/20 px-4 py-2 text-sm">
            Live from today&apos;s completed tokens
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                {["TOKEN", "CUSTOMER", "SERVICE PROVIDER", "SERVICE DURATION", "COMPLETED AT"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-xs font-semibold tracking-wide text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!loading && historyRecords.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-sm text-slate-500">
                    No completed sessions found.
                  </td>
                </tr>
              )}
              {historyRecords.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 transition-colors hover:bg-slate-50">
                  <td className="px-3 py-3.5">
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {r.ticket}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-sm font-medium text-slate-800">{r.patient}</td>
                  <td className="px-3 py-3.5 text-sm text-slate-700">{r.provider}</td>
                  <td className="px-3 py-3.5 text-sm text-slate-600">
                    {r.durationMinutes ? `${r.durationMinutes}m` : "-"}
                  </td>
                  <td className="px-3 py-3.5 text-sm font-semibold text-slate-900">{r.completedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
