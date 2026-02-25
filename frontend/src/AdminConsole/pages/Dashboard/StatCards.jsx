import { Ticket, Clock, UsersRound } from "lucide-react";

const stats = [
  {
    label: "Active Tokens",
    value: "42",
    change: "↗5%",
    changeColor: "text-green-600",
    sub: "from yesterday",
    icon: Ticket,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-200",
  },
  {
    label: "Avg Wait Time",
    value: "12m",
    change: "↗2m",
    changeColor: "text-red-500",
    sub: "vs 10m target",
    icon: Clock,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    border: "border-orange-200",
  },
  {
    label: "Staff Online",
    value: "8/10",
    change: "+1",
    changeColor: "text-green-600",
    sub: "active counters",
    icon: UsersRound,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    border: "border-green-200",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className={`bg-white rounded-xl border ${s.border} p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
              <div
                className={`w-9 h-9 ${s.iconBg} rounded-lg flex items-center justify-center`}
              >
                <Icon size={18} className={s.iconColor} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {s.value}
              </span>
              <span className={`text-sm font-medium ${s.changeColor}`}>
                {s.change}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
