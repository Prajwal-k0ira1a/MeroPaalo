import { queuePatients } from "../../data/mockData";
import Avatar from "../../components/Avatar";
import StatusBadge from "../../components/StatusBadge";
import Pagination from "../../components/Pagination";
import StatCard from "../../components/StatCard";

export default function QueueListPage() {
  return (
    <div className="flex-1">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Patient Queue</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time overview of current department queues</p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="TOTAL IN QUEUE" value="12" icon="👥" />
        <StatCard label="AVG. WAIT TIME" value="14m" icon="⏱" valueColor="text-amber-500" />
        <StatCard label="PRIORITY CASES" value="02" icon="!" valueColor="text-green-600" />
        <StatCard label="SERVED TODAY" value="42" icon="✔" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 w-72">
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              className="bg-transparent text-sm outline-none text-gray-700 w-full placeholder-gray-400"
              placeholder="Search patient..."
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            ⚙ Filters
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {["TICKET", "PATIENT NAME", "TYPE", "CHECK-IN", "WAIT TIME", "STATUS", "ACTION"].map((h) => (
                <th key={h} className="text-left text-xs font-bold text-gray-400 tracking-wider py-2 px-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queuePatients.map((p, i) => (
              <tr
                key={p.ticket}
                className={`border-b border-gray-50 transition-colors ${i === 0 ? "bg-green-50" : "hover:bg-gray-50"}`}
              >
                <td className="py-3.5 px-3 font-bold text-sm text-gray-900">{p.ticket}</td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <Avatar initials={p.initials} />
                    <span className="font-medium text-sm text-gray-800">{p.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-sm text-gray-600">{p.type}</td>
                <td className="py-3.5 px-3 text-sm text-gray-600">{p.checkIn}</td>
                <td className="py-3.5 px-3 text-sm text-gray-600">{p.wait}</td>
                <td className="py-3.5 px-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="py-3.5 px-3">
                  <button className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors text-lg">
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">Showing 1-5 of 12 patients</span>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
