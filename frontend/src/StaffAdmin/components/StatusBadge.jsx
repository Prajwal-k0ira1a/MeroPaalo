const variants = {
  "IN PROGRESS": "bg-emerald-100 text-emerald-700",
  "NEXT": "bg-sky-100 text-sky-700",
  "PRIORITY": "bg-amber-100 text-amber-700",
  "WAITING": "bg-slate-100 text-slate-600",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
        variants[status] || variants.WAITING
      }`}
    >
      {status === "IN PROGRESS" && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
      )}
      {status}
    </span>
  );
}
