const variants = {
  "IN PROGRESS": "bg-green-100 text-green-700",
  "NEXT": "bg-blue-100 text-blue-700",
  "PRIORITY": "bg-amber-100 text-amber-700",
  "WAITING": "bg-gray-100 text-gray-600",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${variants[status] || variants["WAITING"]}`}>
      {status === "IN PROGRESS" && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
      )}
      {status}
    </span>
  );
}
