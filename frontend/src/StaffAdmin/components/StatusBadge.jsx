const variants = {
  serving: "bg-emerald-100 text-emerald-700",
  called: "bg-sky-100 text-sky-700",
  waiting: "bg-slate-100 text-slate-600",
  missed: "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-rose-100 text-rose-700",
};

const labels = {
  serving: "IN PROGRESS",
  called: "CALLED",
  waiting: "WAITING",
  missed: "MISSED",
  completed: "COMPLETED",
  cancelled: "CANCELLED",
};

export default function StatusBadge({ status }) {
  const normalized = String(status || "waiting").toLowerCase();
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
        variants[normalized] || variants.waiting
      }`}
    >
      {normalized === "serving" && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
      )}
      {labels[normalized] || String(status || "WAITING").toUpperCase()}
    </span>
  );
}
