import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import JoinHeader from "./components/JoinHeader";
import JoinFooter from "./components/JoinFooter";
import LiveQueueStats from "./components/LiveQueueStats";
import CheckInCard from "./components/CheckInCard";
import TokenSuccessCard from "./components/TokenSuccessCard";
import ErrorBanner from "./components/ErrorBanner";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const TOKEN_STORAGE_KEY = "meropaalo_customer_token";

// Seed data for demonstration & development fallback
const MOCK_DATA = {
  institutionName: "City General Hospital",
  queueName: "Outpatient Registration",
  estimatedWaitMinutes: 18,
  aheadCount: 12,
  queueStatus: "active",
};

export const JoinPage = () => {
  const [searchParams] = useSearchParams();
  const institution = searchParams.get("institution") || "";
  const department = searchParams.get("department") || "";
  const canQuery = Boolean(institution && department);

  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");
  const [queueInfo, setQueueInfo] = useState(null);
  const [token, setToken] = useState(null);

  const queueOpen = queueInfo?.queueStatus === "active";
  const sessionId = useMemo(() => department ? department.slice(-6).toUpperCase() : "", [department]);

  useEffect(() => {
    const fetchQueueInfo = async () => {
      // If no params are provided, we show mock data for demonstration
      if (!canQuery) {
        setQueueInfo(MOCK_DATA);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(`${API_BASE}/public/queue/${department}/info?institution=${institution}`);
        const json = await res.json();

        if (!res.ok) {
          // On failure, we still fallback to mock so the UI stays "Full" as requested
          setQueueInfo(MOCK_DATA);
          return;
        }
        setQueueInfo(json.data);
      } catch (err) {
        // Fallback to mock on network error
        setQueueInfo(MOCK_DATA);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQueueInfo();
  }, [canQuery, department, institution]);

  const handleJoin = async () => {
    if (!canQuery || isJoining || !queueOpen) return;
    setIsJoining(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/tokens/issue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ institution, department }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Service busy. Please try again.");
      setToken(json.data);
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify({
        tokenId: json.data._id,
        institutionId: institution,
        tokenNumber: json.data.tokenNumber,
      }));
    } catch (err) {
      setError(err.message || "Could not reserve spot.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <JoinHeader />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-3 md:py-5 flex flex-col gap-6 md:gap-8">

        {/* Standardized Header / Breadcrumb Area — Restored MeroPaalo Style */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.2em] leading-none mb-1 font-display">Service Protocol 5.0</p>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none font-display">
                {isLoading ? "••••••••" : (queueInfo?.institutionName || "Service Center")}
              </h1>
            </div>
            <div className="text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-slate-100 pl-4 md:pl-0 md:pr-4 py-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Department</p>
              <p className="text-sm font-black text-slate-700 uppercase tracking-tighter">{queueInfo?.queueName || "General Intake"}</p>
            </div>
          </div>
          <div className="h-0.5 bg-slate-100/50 w-full rounded-full" />
        </div>

        <ErrorBanner message={error} />

        <LiveQueueStats queueInfo={queueInfo} isLoading={isLoading} />

        {/* Action Center */}
        <div className="flex justify-center mt-4">
          {token ? (
            <TokenSuccessCard token={token} institution={institution} />
          ) : (
            <CheckInCard
              onJoin={handleJoin}
              isJoining={isJoining}
              canJoin={queueOpen && !isLoading}
              sessionId={sessionId}
            />
          )}
        </div>
      </main>

      <JoinFooter />
    </div>
  );
};
