import { CalendarDays, SlidersHorizontal, Download, EllipsisVertical, Clock3 } from "lucide-react";
import { historyRecords } from "../../data/mockData";
import HistoryChart from "./HistoryChart";
import Pagination from "../../components/Pagination";

export default function ServiceHistoryPage() {
  return (
    <div className="flex-1">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Service History</h1>
          <p className="mt-1 text-sm text-slate-500">View and manage completed patient sessions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
            <CalendarDays size={14} className="text-slate-500" />
            Oct 24, 2024
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
            <SlidersHorizontal size={14} />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700">
            <Download size={14} />
            Export
          </button>
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
              08:15 <span className="text-lg font-normal">mins</span>
            </p>
          </div>
          <div className="mt-6 inline-flex self-start rounded-full bg-black/20 px-4 py-2 text-sm">
            -2.4% from yesterday
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                {["TICKET", "PATIENT NAME", "SERVICE PROVIDER", "SERVICE DURATION", "COMPLETED AT", "ACTIONS"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-xs font-semibold tracking-wide text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historyRecords.map((r) => (
                <tr key={r.ticket} className="border-b border-slate-50 transition-colors hover:bg-slate-50">
                  <td className="px-3 py-3.5">
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                      {r.ticket}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-sm font-medium text-slate-800">{r.patient}</td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${r.providerBg}`}
                      >
                        {r.providerInitials}
                      </div>
                      <span className="text-sm text-slate-700">{r.provider}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-slate-600">{r.duration}</td>
                  <td className="px-3 py-3.5 text-sm font-semibold text-slate-900">{r.completed}</td>
                  <td className="px-3 py-3.5">
                    <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                      <EllipsisVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-slate-500">Showing 1 to 5 of 42 sessions</span>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
