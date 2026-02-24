export default function Pagination() {
  return (
    <div className="flex items-center gap-1">
      {["‹", "1", "2", "3", "›"].map((p, i) => (
        <button
          key={i}
          className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center border transition-colors
            ${p === "1"
              ? "bg-green-500 text-white border-green-500 font-bold"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
