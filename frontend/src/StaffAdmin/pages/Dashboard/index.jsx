import CurrentlyServing from "./CurrentlyServing";
import SessionSummary from "./SessionSummary";
import QuickActions from "./QuickActions";
import UpcomingQueue from "./UpcomingQueue";

export default function DashboardPage() {
  return (
    <div className="grid flex-1 grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-4">
        <CurrentlyServing />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SessionSummary />
          <QuickActions />
        </div>
      </div>
      <UpcomingQueue />
    </div>
  );
}
