export default function StatCard({ label, value, icon, valueColor }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <p className="text-xs font-bold text-gray-400 tracking-widest">{label}</p>
      <div className="flex items-center gap-3 mt-2">
        <span className={`text-3xl font-black ${valueColor || "text-gray-900"}`}>{value}</span>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
