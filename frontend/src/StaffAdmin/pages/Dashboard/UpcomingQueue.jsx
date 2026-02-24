import { upcomingPatients } from "../../data/mockData";

export default function UpcomingQueue() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <span className="font-bold text-base text-gray-900">Upcoming</span>
        <span className="text-sm font-semibold text-gray-500">12 IN LINE</span>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        {upcomingPatients.map((p) => (
          <div
            key={p.id}
            className={`flex justify-between items-center px-3 py-3 rounded-xl
              ${p.next ? "bg-green-50 border border-green-200" : "border border-transparent"}`}
          >
            <div>
              <p className="font-bold text-sm text-gray-900">{p.id}</p>
              <p className="text-xs text-gray-500 mt-0.5">{p.name}</p>
            </div>
            <div className="text-right">
              {p.next && <p className="text-xs font-bold text-green-600">NEXT</p>}
              <p className={`text-sm font-semibold ${p.next ? "text-green-600" : "text-gray-700"}`}>{p.wait}</p>
              {p.next && <p className="text-xs text-gray-400">WAIT</p>}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-5 w-full py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
        View Entire Queue
      </button>
    </div>
  );
}
