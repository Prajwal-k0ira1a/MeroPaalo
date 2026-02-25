import { Ticket, Clock, UsersRound } from "lucide-react";

export default function StatCards({ dashboard, counters }) {
  const totalCounters = counters.length;
  const openCounters = counters.filter((counter) => counter.status === "open").length;

  const stats = [
    {
      label: "Active Tokens",
      value: String(dashboard.totalWaitingTokens ?? 0),
      change: `Completed ${dashboard.totalCompletedToday ?? 0}`,
      changeColor: "text-green-600",
      sub: `${dashboard.tokensToday ?? 0} tokens today`,
      icon: Ticket,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-blue-200",
    },
    {
      label: "Avg Wait Time",
      value: `${dashboard.averageWaitTimeMinutes ?? 0}m`,
      change: `Serving ${dashboard.currentServingNumber || "--"}`,
      changeColor: "text-orange-500",
      sub: `Queue is ${dashboard.queueStatus || "closed"}`,
      icon: Clock,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      border: "border-orange-200",
    },
    {
      label: "Staff Online",
      value: `${openCounters}/${totalCounters}`,
      change: dashboard.queueStatus === "active" ? "Queue live" : "Queue not active",
      changeColor: dashboard.queueStatus === "active" ? "text-green-600" : "text-red-500",
      sub: "open counters",
      icon: UsersRound,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      border: "border-green-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div key={stat.label} className={`rounded-xl border bg-white p-5 ${stat.border}`}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.iconBg}`}>
                <Icon size={18} className={stat.iconColor} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              <span className={`text-sm font-medium ${stat.changeColor}`}>{stat.change}</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">{stat.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
