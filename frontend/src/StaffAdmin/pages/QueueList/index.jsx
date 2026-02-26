import { useMemo, useState } from "react";
import { Search, Users, Clock3, AlertTriangle, CheckCircle2 } from "lucide-react";
import Avatar from "../../components/Avatar";
import StatusBadge from "../../components/StatusBadge";
import StatCard from "../../components/StatCard";

export default function QueueListPage({
  queueItems = [],
  loading,
  error,
  servedToday,
  totalInQueue,
  selectedCounterId,
  counters = [],
  onCounterChange,
}) {
  const [query, setQuery] = useState("");

  const filteredQueue = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return queueItems;
    return queueItems.filter((item) =>
      [item.ticket, item.name].some((value) => String(value || "").toLowerCase().includes(q)),
    );
  }, [query, queueItems]);

  const avgWaitMinutes = queueItems.length
    ? Math.round(queueItems.reduce((sum, item) => sum + (item.waitMins || 0), 0) / queueItems.length)
    : 0;

  const priorityCases = queueItems.filter((item) => item.status === "missed").length;

  return (
    <div className="flex-1">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Queue Operations</h1>
        <p className="mt-1 text-sm text-slate-500">Real-time overview of your department queue.</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="TOTAL IN QUEUE" value={String(totalInQueue)} icon={Users} />
        <StatCard
          label="AVG. WAIT TIME"
          value={`${avgWaitMinutes}m`}
          icon={Clock3}
          valueColor="text-amber-600"
        />
        <StatCard
          label="MISSED CASES"
          value={String(priorityCases)}
          icon={AlertTriangle}
          valueColor="text-red-600"
        />
        <StatCard label="SERVED TODAY" value={String(servedToday)} icon={CheckCircle2} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 sm:max-w-72">
            <Search size={15} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder-slate-400"
              placeholder="Search token or customer..."
            />
          </div>
          <select
            value={selectedCounterId}
            onChange={(e) => onCounterChange(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal-500"
          >
            <option value="">Select counter</option>
            {counters.map((counter) => (
              <option key={counter._id} value={counter._id}>
                {counter.counterName} ({counter.status})
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                {["TOKEN", "CUSTOMER", "CHECK-IN", "WAIT TIME", "STATUS"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-xs font-semibold tracking-wide text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!loading && filteredQueue.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-sm text-slate-500">
                    No queue records found.
                  </td>
                </tr>
              )}
              {filteredQueue.map((p) => (
                <tr
                  key={p.id}
                  className={`border-b border-slate-50 transition-colors ${
                    p.isCurrent ? "bg-teal-50/60" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-3 py-3.5 text-sm font-semibold text-slate-900">{p.ticket}</td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar initials={p.initials} />
                      <span className="text-sm font-medium text-slate-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-slate-600">{p.checkIn}</td>
                  <td className="px-3 py-3.5 text-sm text-slate-600">{p.wait}</td>
                  <td className="px-3 py-3.5">
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
