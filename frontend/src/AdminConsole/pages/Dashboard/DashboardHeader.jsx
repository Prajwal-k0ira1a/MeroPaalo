import { Plus } from "lucide-react";

export default function DashboardHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Live monitoring of queue performance and staff availability.
                </p>
            </div>
            <button className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">
                <Plus size={14} />
                Issue New Token
            </button>
        </div>
    );
}
