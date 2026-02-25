import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const TOKEN_STORAGE_KEY = "meropaalo_customer_token";

const formatTime = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const JoinPage = () => {
  const [searchParams] = useSearchParams();
  const institution = searchParams.get("institution") || "";
  const department = searchParams.get("department") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");
  const [queueInfo, setQueueInfo] = useState(null);
  const [token, setToken] = useState(null);

  const canQuery = useMemo(() => Boolean(institution && department), [institution, department]);
  const queueOpen = queueInfo?.queueStatus === "active";

  useEffect(() => {
    const loadQueueInfo = async () => {
      if (!canQuery) {
        setError("Invalid QR link. Missing institution or department.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${API_BASE}/public/queue/${department}/info?institution=${institution}`
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Unable to load queue details.");
        setQueueInfo(json.data);
      } catch (err) {
        setError(err.message || "Unable to load queue details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadQueueInfo();
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
      if (!res.ok) throw new Error(json.message || "Failed to issue token.");
      setToken(json.data);
      try {
        localStorage.setItem(
          TOKEN_STORAGE_KEY,
          JSON.stringify({
            tokenId: json.data?._id,
            institutionId: institution,
            tokenNumber: json.data?.tokenNumber,
          })
        );
      } catch {
        // best effort persistence only
      }
    } catch (err) {
      setError(err.message || "Failed to issue token.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <section className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase">MeroPaalo Queue Join</p>
        <h1 className="text-2xl font-bold text-slate-900 mt-2">Join Queue</h1>
        <p className="text-sm text-slate-600 mt-1">Scan link detected for your institution department queue.</p>

        {isLoading && (
          <div className="mt-6 text-sm text-slate-600">Loading queue details...</div>
        )}

        {!isLoading && (
          <div className="mt-6 space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
                {error}
              </div>
            )}

            {queueInfo && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Institution:</span> {queueInfo.institutionName}
                </p>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Department:</span> {queueInfo.queueName}
                </p>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Queue status:</span> {queueInfo.queueStatus}
                </p>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Hours:</span> {formatTime(queueInfo.startTime)} -{" "}
                  {formatTime(queueInfo.endTime)}
                </p>
              </div>
            )}

            {token ? (
              <div className="rounded-xl border border-teal-200 bg-teal-50 p-5 text-center">
                <p className="text-sm text-teal-700 font-semibold">Token Issued</p>
                <p className="text-4xl font-black text-teal-800 tracking-wider mt-2">{token.tokenNumber}</p>
                <p className="text-xs text-teal-700 mt-2">Token ID: {token._id}</p>
                <Link
                  to={`/token-status?tokenId=${encodeURIComponent(token._id)}&institution=${encodeURIComponent(
                    institution
                  )}&tokenNumber=${encodeURIComponent(token.tokenNumber)}`}
                  className="inline-block mt-4 rounded-xl bg-teal-700 text-white font-semibold py-2 px-4 hover:bg-teal-800 transition-colors"
                >
                  Track Live Status
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleJoin}
                disabled={!queueOpen || isJoining || !queueInfo}
                className="w-full rounded-xl bg-teal-600 text-white font-semibold py-3 px-4 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isJoining ? "Issuing Token..." : "Take My Token"}
              </button>
            )}

            <div className="pt-2 text-sm text-slate-600">
              Staff/Admin?{" "}
              <Link className="text-teal-700 font-semibold hover:text-teal-800" to="/login">
                Login
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
