import CurrentlyServing from "./CurrentlyServing";
import SessionSummary from "./SessionSummary";
import QuickActions from "./QuickActions";
import UpcomingQueue from "./UpcomingQueue";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-[1fr_380px] gap-5 flex-1">
      <div className="flex flex-col gap-4">
        <CurrentlyServing />
        <div className="grid grid-cols-2 gap-4">
          <SessionSummary />
          <QuickActions />
        </div>
      </div>
      <UpcomingQueue />
    </div>
  );
}
