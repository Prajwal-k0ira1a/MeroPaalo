import {
    LayoutDashboard,
    Monitor,
    Users,
    BarChart3,
    Settings,
    Zap,
} from "lucide-react";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "counters", label: "Counters", icon: Monitor },
    { id: "staff", label: "Staff", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ activeNav, setActiveNav }) {
    return (
        <aside className="w-56 bg-[#111827] text-white flex flex-col min-h-screen">
            {/* Logo */}
            <div className="px-5 py-5 flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white rounded-full" />
                </div>
                <div>
                    <p className="text-sm font-bold leading-tight">MeroPaalo</p>
                    <p className="text-[11px] text-gray-400">Admin Console</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 mt-2 flex flex-col gap-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveNav(item.id)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full text-left transition-colors
                ${isActive
                                    ? "bg-teal-600 text-white font-semibold"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* Priority Queue Promo */}
            <div className="mx-3 mb-4">
                <div className="bg-linear-to-br from-teal-600 to-teal-700 rounded-xl p-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                        <Zap size={16} className="text-white" />
                    </div>
                    <p className="text-sm font-semibold">Priority Queue</p>
                    <p className="text-xs text-teal-200 mt-1 leading-relaxed">
                        Enable VIP handling for high-value clients.
                    </p>
                    <button className="mt-3 w-full bg-white text-teal-700 text-xs font-semibold py-2 rounded-lg hover:bg-teal-50 transition-colors">
                        Upgrade Plan
                    </button>
                </div>
            </div>

            {/* User Info */}
            <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold">
                    AM
                </div>
                <div>
                    <p className="text-sm font-medium">Alex Morgan</p>
                    <p className="text-xs text-gray-400">Branch Manager</p>
                </div>
            </div>
        </aside>
    );
}
