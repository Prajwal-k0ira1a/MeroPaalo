const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "queue", label: "Queue List", icon: "☰" },
  { id: "history", label: "Service History", icon: "◷" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar({ activeNav, setActiveNav }) {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between p-4 shrink-0">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-colors duration-150
              ${activeNav === item.id
                ? "bg-green-500 text-white font-bold"
                : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-xs font-bold text-gray-400 tracking-widest mb-2">SYSTEM STATUS</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          <span className="text-sm text-gray-700">Live Connection</span>
        </div>
      </div>
    </aside>
  );
}
