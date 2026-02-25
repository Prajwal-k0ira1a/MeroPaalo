import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { LeftSidebar } from "./components/LeftSidebar";
import { authService } from "./authService";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen lg:overflow-hidden overflow-y-auto">
      {/* Left branded panel */}
      <LeftSidebar />

      {/* Right form section */}
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-6 py-6">
        {/* Mobile-only logo */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow">
            M
          </div>
          <span className="font-bold text-slate-900 text-lg">MeroPaalo</span>
        </div>

        {/* Form card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 p-6 lg:p-8">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-5">
                <span className="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full border border-teal-100 mb-3">
                  Password recovery
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">
                  Forgot your password?
                </h1>
                <p className="text-slate-500 text-sm">
                  No worries — enter your email and we'll send you a reset link.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 font-medium">
                    {error}
                  </div>
                )}
                <Input
                  label="Work Email"
                  type="email"
                  name="email"
                  placeholder="name@institution.com"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending link…" : "Send Reset Link →"}
                </Button>
              </form>

              {/* Back to login */}
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 font-semibold hover:text-teal-600 transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to Sign In
                </Link>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-teal-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
                Check your email
              </h2>
              <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                We've sent a password reset link to{" "}
                <span className="font-semibold text-slate-700">{email}</span>.
                Check your inbox and follow the instructions.
              </p>

              <Button
                variant="primary"
                size="lg"
                className="w-full mb-4"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
              >
                Resend Email
              </Button>

              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 font-semibold hover:text-teal-600 transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Sign In
              </Link>
            </div>
          )}

          {/* Footer policy links */}
          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-slate-600 transition-colors">
              Terms of Service
            </a>
            <span>·</span>
            <a href="#" className="hover:text-slate-600 transition-colors">
              Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
