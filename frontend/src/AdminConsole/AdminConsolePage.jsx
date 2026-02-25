import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import DashboardPage from "./pages/Dashboard";
import CountersPage from "./pages/Counters";
import UsersPage from "./pages/Users";

export default function AdminConsolePage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = {
    dashboard: <DashboardPage />,
    counters: <CountersPage />,
    users: <UsersPage />,
  };

  const pageTitle =
    activeNav === "counters"
      ? "Counters"
      : activeNav === "users"
        ? "Users"
        : "Dashboard";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 lg:relative lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <AdminSidebar
          activeNav={activeNav}
          setActiveNav={(nav) => {
            setActiveNav(nav);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} title={pageTitle} />
        <main className="flex-1 px-4 py-4 sm:px-6 md:px-8 overflow-auto lg:overflow-hidden min-h-0">
          {pages[activeNav] || (
            <p className="text-gray-400 text-sm">Page coming soon...</p>
          )}
        </main>
      </div>
    </div>
  );
}
