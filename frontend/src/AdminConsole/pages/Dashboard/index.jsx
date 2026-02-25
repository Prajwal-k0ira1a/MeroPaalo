import DashboardHeader from "./DashboardHeader";
import StatCards from "./StatCards";
import LiveQueueTable from "./LiveQueueTable";
import PeakHoursChart from "./PeakHoursChart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 h-full max-w-350">
      <DashboardHeader />
      <StatCards />

      {/* Queue + Chart — takes remaining height */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4 flex-1 min-h-0">
        <LiveQueueTable />
        <PeakHoursChart />
      </div>
    </div>
  );
}
