import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import JoinHeader from "./components/JoinHeader";
import JoinFooter from "./components/JoinFooter";

const CUSTOMER_USERNAME_KEY = "meropaalo_customer_username";

export const CustomerLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const department = searchParams.get("department") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      const errorMsg = "Please enter both name and email.";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const errorMsg = "Please enter a valid email address.";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setIsLoading(true);
    setError("");
    const loadingToast = toast.loading("Verifying information...");

    try {
      // Store customer info
      localStorage.setItem(
        CUSTOMER_USERNAME_KEY,
        JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          loginTime: new Date().toISOString(),
        }),
      );

      toast.dismiss(loadingToast);
      toast.success(`Welcome, ${name.trim()}!`);
      // Redirect to join page
      navigate(`/join?department=${department}`);
    } catch (err) {
      const errorMsg = err.message || "Login failed. Please try again.";
      setError(errorMsg);
      toast.dismiss(loadingToast);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <JoinHeader showNav={false} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-6 md:py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.2em] leading-none mb-2">
              Queue Access
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Welcome to Queue
            </h1>
            <p className="text-sm text-slate-600 mt-3">
              Please enter your information to join the virtual queue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Enter your full name"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 disabled:bg-slate-100 disabled:cursor-not-allowed transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email address"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 disabled:bg-slate-100 disabled:cursor-not-allowed transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition mt-6"
            >
              {isLoading ? "Verifying..." : "Continue to Queue"}
            </button>
          </form>

          {/* Info Box */}
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
            <p className="text-xs text-slate-600">
              <span className="font-semibold">Privacy Protected:</span> Your
              information is used only for queue management and will be kept
              confidential.
            </p>
          </div>
        </div>
      </main>

      <JoinFooter />
    </div>
  );
};
