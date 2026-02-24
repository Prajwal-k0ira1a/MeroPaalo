import { useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/Dashboard";
import QueueListPage from "./pages/QueueList";
import ServiceHistoryPage from "./pages/ServiceHistory";
import SettingsPage from "./pages/Settings";

export default function SmartQueueApp() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const pages = {
    dashboard: <DashboardPage />,
    queue: <QueueListPage />,
    history: <ServiceHistoryPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <main className="flex-1 p-6 flex flex-col overflow-auto">
          {pages[activeNav]}
        </main>
      </div>
      <footer className="text-center py-4 text-xs text-gray-400 bg-white border-t border-gray-200">
        © 2024 SmartQueue Efficiency Systems. Terminal ID: SEC-404-SQ.
      </footer>
    </div>
  );
}