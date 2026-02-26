import { Clock3, Megaphone, PlayCircle, CheckCircle2 } from "lucide-react";

const formatStatus = (status) => {
  if (!status) return "WAITING";
  return String(status).toUpperCase();
};

export default function CurrentlyServing({
  currentToken,
  actionLoading,
  onServeNext,
  onCompleteCurrent,
  onCallCurrent,
  selectedCounterId,
  counters = [],
  onCounterChange,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-teal-700">
          CURRENTLY SERVING
        </span>
        <span className="rounded-md bg-teal-600 px-3 py-1 text-xs font-semibold tracking-wide text-white">
          {formatStatus(currentToken?.status)}
        </span>
      </div>

      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 max-w-72">
          <select
            value={selectedCounterId}
            onChange={(e) => onCounterChange(e.target.value)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal-500"
          >
            <option value="">Select counter</option>
            {counters.map((counter) => (
              <option key={counter._id} value={counter._id}>
                {counter.counterName} ({counter.status})
              </option>
            ))}
          </select>
        </div>
        <div className="text-5xl font-black leading-none tracking-tighter text-slate-900 sm:text-7xl lg:text-8xl">
          {currentToken?.ticket || "-"}
        </div>
        <div className="mt-4 text-lg font-semibold text-slate-700">
          Patient: {currentToken?.name || "No token is currently active"}
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-slate-500">
          <Clock3 size={14} /> Waiting time: {currentToken?.waitMins ?? 0} mins
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          onClick={onServeNext}
          disabled={actionLoading || !selectedCounterId}
          className="cursor-pointer rounded-2xl bg-teal-600 py-5 text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <PlayCircle size={18} />
            <span className="text-xs font-semibold tracking-wide">
              {actionLoading ? "PROCESSING" : "SERVE NEXT"}
            </span>
          </div>
        </button>
        <button
          onClick={onCompleteCurrent}
          disabled={actionLoading || !currentToken || !selectedCounterId}
          className="cursor-pointer rounded-2xl bg-blue-600 py-5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <CheckCircle2 size={18} />
            <span className="text-xs font-semibold tracking-wide">
              COMPLETE
            </span>
          </div>
        </button>
        <button
          onClick={onCallCurrent}
          disabled={actionLoading || !currentToken || !selectedCounterId}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white py-5 text-slate-800 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <Megaphone size={18} />
            <span className="text-xs font-semibold tracking-wide">RECALL</span>
          </div>
        </button>
      </div>
    </div>
  );
}
