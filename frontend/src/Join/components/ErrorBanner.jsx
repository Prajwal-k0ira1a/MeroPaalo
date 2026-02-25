/**
 * ErrorBanner — Refined
 * Minimalist error display. Uses a simple flat style instead of 
 * the generic rounded-box alert pattern.
 */
export default function ErrorBanner({ message }) {
    if (!message) return null;

    return (
        <div className="w-full max-w-4xl animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3 py-3 px-4 bg-red-50 border-l-2 border-red-500 rounded-r-lg">
                <AlertIcon />
                <p className="text-sm font-semibold text-red-900 leading-none">
                    {message}
                </p>
            </div>
        </div>
    );
}

function AlertIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
            <line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" />
        </svg>
    );
}
