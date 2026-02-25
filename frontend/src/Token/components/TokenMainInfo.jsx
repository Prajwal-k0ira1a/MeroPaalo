export default function TokenMainInfo({ token, queueInfo, isLoading }) {
  const queueStatusLabel =
    queueInfo?.queueStatus === "paused"
      ? "Paused"
      : queueInfo?.queueStatus === "closed"
        ? "Closed"
        : "Active";

  const currentServing = token?.currentServingNumber
    ? `#${token.currentServingNumber}`
    : "-";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-8 md:p-12 text-center border-b border-slate-100 flex flex-col items-center">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4 font-display">
          Session Identifier
        </span>
        <div className="relative group">
          <h1 className="text-[5rem] md:text-[7rem] font-semibold text-slate-900 tracking-tighter leading-none font-display">
            {isLoading ? "..." : token?.tokenNumber || "A-108"}
          </h1>
        </div>
      </div>

      <div className="px-6 py-4 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-slate-100">
        <div className="text-center sm:text-left">
          <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-tight font-display">
            {queueInfo?.institutionName || "MeroPaalo Queue"}
          </h3>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-0.5">
            {queueInfo?.queueName || "General Service"}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 rounded-lg">
          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            {queueStatusLabel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-slate-100">
        <StatItem label="Current" value={isLoading ? "-" : currentServing} highlight />
        <StatItem
          label="Position"
          value={
            isLoading
              ? "-"
              : token?.aheadCount !== undefined
                ? String(token.aheadCount).padStart(2, "0")
                : "00"
          }
        />
        <StatItem
          label="Wait Est."
          value={isLoading ? "-" : `${token?.estimatedWaitMinutes || 0}m`}
        />
      </div>
    </div>
  );
}

function StatItem({ label, value, highlight = false }) {
  return (
    <div className="py-5 px-4 text-center flex flex-col gap-1">
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
        {label}
      </p>
      <p
        className={`text-xl md:text-2xl font-bold tracking-tight ${highlight ? "text-teal-600" : "text-slate-800"}`}
      >
        {value}
      </p>
    </div>
  );
}
