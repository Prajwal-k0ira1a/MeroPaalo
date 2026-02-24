export default function SessionSummary() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📊</span>
        <span className="font-bold text-base text-gray-900">Session Summary</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-bold text-gray-400 tracking-widest">SERVED TODAY</p>
          <p className="text-3xl font-black text-gray-900 mt-1">42</p>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 tracking-widest">AVG. SERVICE</p>
          <p className="text-3xl font-black text-gray-900 mt-1">08:15</p>
        </div>
      </div>
    </div>
  );
}
