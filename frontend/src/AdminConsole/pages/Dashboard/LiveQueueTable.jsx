import {
  Search,
  SlidersHorizontal,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { queueData } from "../../data/adminMockData";

function tokenColor(token) {
  const prefix = token.charAt(0);
  if (prefix === "A") return "bg-teal-100 text-teal-700";
  if (prefix === "B") return "bg-rose-100 text-rose-600";
  if (prefix === "C") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

export default function LiveQueueTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">
          Live Queue Management
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Search size={16} className="text-gray-400" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <SlidersHorizontal size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Table — scrolls internally if needed */}
      <div className="overflow-auto flex-1 min-h-0 -mx-4 sm:-mx-5">
        <table className="w-full min-w-130">
          <thead>
            <tr className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
              <th className="pb-2 px-4 sm:px-5">Token #</th>
              <th className="pb-2">Customer Name</th>
              <th className="pb-2 hidden sm:table-cell">Service</th>
              <th className="pb-2">Wait Time</th>
              <th className="pb-2 pr-4 sm:pr-5"></th>
            </tr>
          </thead>
          <tbody>
            {queueData.map((row) => (
              <tr key={row.token} className="border-t border-gray-100">
                <td className="py-2.5 px-4 sm:px-5">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold ${tokenColor(row.token)}`}
                  >
                    {row.token}
                  </span>
                </td>
                <td className="py-2.5 text-sm font-medium text-gray-800">
                  {row.name}
                </td>
                <td className="py-2.5 text-sm text-gray-500 hidden sm:table-cell">
                  {row.service}
                </td>
                <td className="py-2.5">
                  <span
                    className={`text-sm font-medium flex items-center gap-1 ${row.urgent ? "text-red-500" : "text-green-600"}`}
                  >
                    {row.urgent && <AlertTriangle size={13} />}
                    {row.wait}
                  </span>
                </td>
                <td className="py-2.5 pr-4 sm:pr-5 text-right">
                  <button className="px-3 py-1 rounded-lg border border-teal-600 text-teal-600 text-xs font-semibold hover:bg-teal-50 transition-colors">
                    Serve Next
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <p className="text-xs text-teal-600 font-medium">
          Showing 5 of 42 waiting
        </p>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded-md hover:bg-gray-100">
            <ChevronLeft size={15} className="text-gray-400" />
          </button>
          <button className="p-1 rounded-md hover:bg-gray-100">
            <ChevronRight size={15} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
