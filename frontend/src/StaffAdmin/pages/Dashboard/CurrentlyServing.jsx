export default function CurrentlyServing() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-teal-600 tracking-widest">CURRENTLY SERVING</span>
        <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-md tracking-wide">
          PRIORITY
        </span>
      </div>
      <div className="text-center mb-7">
        <div className="text-8xl font-black text-gray-900 leading-none tracking-tighter">#A-123</div>
        <div className="mt-4 text-lg font-semibold text-gray-700">Patient: Johnathan Doe</div>
        <div className="mt-2 text-sm text-gray-500 flex items-center justify-center gap-1.5">
          <span>🕐</span> Waiting time: 14 mins
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <button className="flex flex-col items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl py-5 transition-colors cursor-pointer">
          <span className="text-xl">▶|</span>
          <span className="text-xs font-bold tracking-wide">SERVE NEXT</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-5 transition-colors cursor-pointer">
          <span className="text-xl">✔</span>
          <span className="text-xs font-bold tracking-wide">COMPLETE</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 rounded-2xl py-5 border border-gray-200 transition-colors cursor-pointer">
          <span className="text-xl">📢</span>
          <span className="text-xs font-bold tracking-wide">RECALL</span>
        </button>
      </div>
    </div>
  );
}
