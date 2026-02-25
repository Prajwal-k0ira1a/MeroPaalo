import { Plus } from "lucide-react";

export default function DashboardHeader({
  departments,
  selectedDepartmentId,
  onDepartmentChange,
  onIssueToken,
  onRefresh,
  loading,
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Live monitoring of queue performance and staff availability.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={selectedDepartmentId}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-teal-500"
        >
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="h-9 rounded-lg border border-gray-300 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Refresh
        </button>

        <button
          onClick={onIssueToken}
          disabled={loading || !selectedDepartmentId}
          className="flex h-9 items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 text-xs font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus size={14} />
          Issue New Token
        </button>
      </div>
    </div>
  );
}
