export default function TokenActions({ onCancel }) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 py-4">
      {/* Help text */}
      <div className="flex items-center gap-4 text-slate-400 max-w-sm">
        <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center shrink-0">
          <InfoIcon />
        </div>
        <p className="text-[10px] font-bold text-slate-400/80 leading-tight uppercase tracking-tight font-display">
          Please proceed to the lobby. You will be notified when your turn is
          "Next Up".
        </p>
      </div>

      {/* Primary Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-white border border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 flex items-center gap-2.5 shadow-sm hover:shadow-lg hover:shadow-red-200 group active:scale-95"
        >
          <div className="transition-transform group-hover:rotate-90 duration-300">
            <CancelIcon />
          </div>
          Cancel Ticket
        </button>
      </div>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}
