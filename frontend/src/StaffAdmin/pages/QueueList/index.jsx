import { Search, SlidersHorizontal, Users, Clock3, AlertTriangle, CheckCircle2, EllipsisVertical } from "lucide-react";
import { queuePatients } from "../../data/mockData";
import Avatar from "../../components/Avatar";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";
import StatCard from "../../components/StatCard";

export default function QueueListPage() {
  return (
    <div className="flex-1">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Patient Queue</h1>
        <p className="mt-1 text-sm text-slate-500">Real-time overview of current department queues</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="TOTAL IN QUEUE" value="12" icon={Users} />
        <StatCard label="AVG. WAIT TIME" value="14m" icon={Clock3} valueColor="text-amber-600" />
        <StatCard label="PRIORITY CASES" value="02" icon={AlertTriangle} valueColor="text-red-600" />
        <StatCard label="SERVED TODAY" value="42" icon={CheckCircle2} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 sm:max-w-72">
            <Search size={15} className="text-slate-400" />
            <input
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder-slate-400"
              placeholder="Search patient..."
            />
          </div>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                {["TICKET", "PATIENT NAME", "TYPE", "CHECK-IN", "WAIT TIME", "STATUS", "ACTION"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-xs font-semibold tracking-wide text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queuePatients.map((p, i) => (
                <tr
                  key={p.ticket}
                  className={`border-b border-slate-50 transition-colors ${i === 0 ? "bg-teal-50/60" : "hover:bg-slate-50"}`}
                >
                  <td className="px-3 py-3.5 text-sm font-semibold text-slate-900">{p.ticket}</td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar initials={p.initials} />
                      <span className="text-sm font-medium text-slate-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-slate-600">{p.type}</td>
                  <td className="px-3 py-3.5 text-sm text-slate-600">{p.checkIn}</td>
                  <td className="px-3 py-3.5 text-sm text-slate-600">{p.wait}</td>
                  <td className="px-3 py-3.5">
                    <StatusBadge status={p.status} />
                  </td>
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
          <span className="text-sm text-slate-500">Showing 1-5 of 12 patients</span>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
