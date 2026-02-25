import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import JoinHeader from "../Join/components/JoinHeader";
import TokenProgress from "./components/TokenProgress";
import TokenMainInfo from "./components/TokenMainInfo";
import TokenActions from "./components/TokenActions";
import JoinFooter from "../Join/components/JoinFooter";
import ErrorBanner from "../Join/components/ErrorBanner";

// MOCK DATA MODE: All API fetching logic removed as requested

// Seed data for demonstration
const MOCK_TOKEN = {
  tokenNumber: "A-108",
  aheadCount: 6,
  estimatedWaitMinutes: 12,
  status: "queue",
  _id: "TKN-DEMO-001",
};

const MOCK_QUEUE = {
  institutionName: "St. Jude Medical Center",
  queueName: "General Consultation",
  queueStatus: "active",
};

export default function TokenPage() {
  const [searchParams] = useSearchParams();
  // const tokenId = searchParams.get("tokenId");
  // const institution = searchParams.get("institution");

  // Strictly using Mock Data as requested
  const [isLoading] = useState(false);
  const [error] = useState("");
  const [tokenData] = useState(MOCK_TOKEN);
  const [queueInfo] = useState(MOCK_QUEUE);

  useEffect(() => {
    console.log("TokenPage: Running in Mock Data mode (No API Sync).");
  }, []);

  const handleCancel = () => {
    if (
      window.confirm("Are you sure you want to cancel your spot in the queue?")
    ) {
      alert("Ticket cancellation request sent to system.");
    }
  };

  const params = searchParams.toString() ? `?${searchParams.toString()}` : "";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <JoinHeader showTimer={true} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-2 md:py-4 flex flex-col gap-5 md:gap-6">
        {/* Navigation Breadcrumb — Ultra-Compact */}
        <div className="flex items-center justify-between">
          <Link
            to={`/join${params}`}
            className="group flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-teal-600 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            >
              <line x1="19" y1="12" x2="5" y2="12" strokeLinecap="round" />
              <polyline points="12 19 5 12 12 5" strokeLinecap="round" />
            </svg>
            Back to Queue
          </Link>

          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] font-display">
            <span className="opacity-50 text-[9px]">Dashboard</span>
            <span className="opacity-20">/</span>
            <span className="text-slate-400">Live Status</span>
          </div>
        </div>

        <ErrorBanner message={error} />

        <div className="flex flex-col gap-5 md:gap-6">
          <TokenProgress status={tokenData?.status || "queue"} />

          <TokenMainInfo
            token={tokenData}
            queueInfo={queueInfo}
            isLoading={isLoading}
          />

          <div className="pt-0.5">
            <TokenActions onCancel={handleCancel} />
          </div>
        </div>
      </main>

      <JoinFooter />
    </div>
  );
}
