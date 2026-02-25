import { useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/Dashboard";
import QueueListPage from "./pages/QueueList";
import ServiceHistoryPage from "./pages/ServiceHistory";

export default function MeroPaaloStaffApp() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pages = {
    dashboard: <DashboardPage />,
    queue: <QueueListPage />,
    history: <ServiceHistoryPage />,
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-gray-100 font-sans">
      <Topbar onMenuClick={() => setSidebarOpen(true)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-0 flex-1">
        <Sidebar
          activeNav={activeNav}
          setActiveNav={(nav) => {
            setActiveNav(nav);
            setSidebarOpen(false);
          }}
          sidebarOpen={sidebarOpen}
        />

        <main className="min-w-0 flex-1 overflow-auto p-4 sm:p-6">{pages[activeNav]}</main>
      </div>

      <footer className="border-t border-gray-200 bg-white py-3 text-center text-xs text-gray-400 sm:py-4">
        © 2024 MeroPaalo. All rights reserved.
      </footer>
    </div>
  );
}
