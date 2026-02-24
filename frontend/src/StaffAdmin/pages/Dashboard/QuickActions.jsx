const actions = [
  { icon: "🔄", label: "Transfer Patient" },
  { icon: "⏸", label: "Take a Break" },
];

export default function QuickActions() {
  return (
    <div className="flex flex-col gap-3">
      {actions.map((item) => (
        <button
          key={item.label}
          className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm cursor-pointer"
        >
          <span className="text-lg">{item.icon}</span>
          <span className="flex-1 text-left">{item.label}</span>
          <span className="text-gray-400 text-lg">›</span>
        </button>
      ))}
    </div>
  );
}
