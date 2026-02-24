export default function Topbar() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-7 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center">
          <div className="grid grid-cols-2 gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-sm" />
            ))}
          </div>
        </div>
        <span className="font-extrabold text-xl text-gray-900 tracking-tight">SmartQueue</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
          <span className="text-sm">👤</span>
          <span className="text-sm font-semibold text-gray-700">Alex Johnson</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
          <span className="text-sm">🪪</span>
          <span className="text-sm font-semibold text-gray-700">Counter 04</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-gray-200" />
      </div>
    </header>
  );
}
