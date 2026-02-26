import { Bell, Calendar, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../Authentication/authService";

const AUTH_USER_STORAGE_KEY = "meropaalo_auth_user";

export default function AdminTopbar({ onMenuClick, title = "Dashboard" }) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const onLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await authService.logout();
    } catch {
      // Ignore API logout failures and continue local cleanup.
    } finally {
      localStorage.removeItem(AUTH_USER_STORAGE_KEY);
      navigate("/login", { replace: true });
      setLoggingOut(false);
    }
  };

  return (
    <header className="h-14 shrink-0 border-b border-gray-200 bg-white px-4 sm:px-6 md:px-8">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="rounded-lg p-2 hover:bg-gray-100 lg:hidden">
            <Menu size={20} className="text-gray-600" />
          </button>

          <div className="flex items-center gap-2 text-sm">
            <span className="hidden text-gray-400 sm:inline">Admin</span>
            <span className="hidden text-gray-300 sm:inline">/</span>
            <span className="font-semibold text-gray-800">{title}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-sm text-gray-500 sm:flex">
            <Calendar size={15} />
            <span>
              {dateStr} - {timeStr}
            </span>
          </div>
          <button
            onClick={onLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut size={14} />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
          <button className="relative rounded-lg p-2 transition-colors hover:bg-gray-100">
            <Bell size={18} className="text-gray-500" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
