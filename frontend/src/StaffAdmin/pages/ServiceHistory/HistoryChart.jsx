import { historyBars, historyLabels } from "../../data/mockData";

export default function HistoryChart() {
  const max = Math.max(...historyBars);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <span className="font-bold text-base text-gray-900">Patients Served (Today)</span>
        <span className="text-xs text-gray-400">Updates every hour</span>
      </div>
      <div className="flex items-end gap-2 h-28">
        {historyBars.map((h, i) => (
          <div key={i} className="flex-1 bg-emerald-300 rounded-t" style={{ height: `${(h / max) * 100}%` }} />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {historyLabels.map((l) => (
          <span key={l} className="text-xs text-gray-400">{l}</span>
        ))}
      </div>
    </div>
  );
}
