import { historyRecords } from "../../data/mockData";
import HistoryChart from "./HistoryChart";
import Pagination from "../../components/Pagination";

export default function ServiceHistoryPage() {
  return (
    <div className="flex-1">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Service History</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage completed patient sessions.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white">
            📅 Oct 24, 2024
          </div>
          <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium bg-white hover:bg-gray-50 transition-colors">
            ⚙ Filter
          </button>
          <button className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-colors">
            ↓ Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_260px] gap-5 mb-5">
        <HistoryChart />
        <div className="bg-green-500 rounded-2xl p-6 text-white flex flex-col justify-between">
          <div>
            <p className="text-sm opacity-80 mb-2">⏱ Avg. Service Time</p>
            <p className="text-5xl font-black leading-none">
              08:15 <span className="text-lg font-normal">mins</span>
            </p>
          </div>
          <div className="bg-black/20 rounded-full px-4 py-2 inline-flex items-center gap-2 text-sm self-start mt-6">
            ↓ -2.4% from yesterday
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {["TICKET", "PATIENT NAME", "SERVICE PROVIDER", "SERVICE DURATION", "COMPLETED AT", "ACTIONS"].map((h) => (
                <th key={h} className="text-left text-xs font-bold text-gray-400 tracking-wider py-2 px-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historyRecords.map((r) => (
              <tr key={r.ticket} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-3.5 px-3">
                  <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg">
                    {r.ticket}
                  </span>
                </td>
                <td className="py-3.5 px-3 font-medium text-sm text-gray-800">{r.patient}</td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${r.providerBg} flex items-center justify-center text-xs font-bold text-white`}>
                      {r.providerInitials}
                    </div>
                    <span className="text-sm text-gray-700">{r.provider}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-sm text-gray-600">{r.duration}</td>
                <td className="py-3.5 px-3 font-bold text-sm text-gray-900">{r.completed}</td>
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
          <span className="text-sm text-gray-500">Showing 1 to 5 of 42 sessions</span>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
