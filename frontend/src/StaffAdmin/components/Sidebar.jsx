import { LayoutGrid, ListOrdered, History, Activity } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "queue", label: "Queue List", icon: ListOrdered },
  { id: "history", label: "Service History", icon: History },
];

export default function Sidebar({ activeNav, setActiveNav, sidebarOpen }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 transform border-r border-slate-200 bg-white p-4 transition-transform duration-200 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mt-16 flex h-full flex-col justify-between lg:mt-0">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${
                  activeNav === item.id
                    ? "bg-teal-600 font-semibold text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500">SYSTEM STATUS</p>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Activity size={14} className="text-emerald-600" />
            Live Connection
          </div>
        </div>
      </div>
    </aside>
  );
}
