export default function TokenProgress({ status = "queue" }) {
  const steps = [
    { key: "registered", label: "Registered" },
    { key: "queue", label: "In Queue" },
    { key: "next", label: "Next Up" },
    { key: "serving", label: "Serving" },
  ];

  const currentIdx = steps.findIndex((s) => s.key === status);
  const normalizedIdx = currentIdx === -1 ? 1 : currentIdx;

  return (
    <div className="w-full py-4 md:py-6">
      <div className="relative flex justify-between items-start max-w-2xl mx-auto px-4">
        {/* Track — Ultra-Light Technical Line */}
        <div className="absolute left-10 right-10 top-1.5 h-px bg-slate-100 z-0" />

        {/* Progress — Solid Technical Fill */}
        <div
          className="absolute left-10 top-1.5 h-px bg-teal-500 z-0 transition-all duration-1000 ease-out"
          style={{ width: `${(normalizedIdx / (steps.length - 1)) * 88}%` }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < normalizedIdx;
          const isActive = idx === normalizedIdx;

          return (
            <div
              key={step.key}
              className="relative z-10 flex flex-col items-center gap-2.5"
            >
              {/* Technical Node Indicator */}
              <div className="relative h-3 flex items-center justify-center">
                <div
                  className={`w-0.5 h-3 transition-all duration-500 ${
                    isCompleted
                      ? "bg-teal-500 scale-y-125"
                      : isActive
                        ? "bg-teal-600 scale-y-150 shadow-[0_0_8px_rgba(20,184,166,0.3)]"
                        : "bg-slate-200"
                  }`}
                />
                {isActive && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-teal-500/10 rounded-full animate-pulse-slow" />
                )}
              </div>

              {/* Label — High Precision Typography */}
              <div className="flex flex-col items-center">
                <span
                  className={`text-[10px] font-bold tracking-widest font-display transition-colors duration-500 ${
                    isActive
                      ? "text-slate-900"
                      : isCompleted
                        ? "text-teal-600"
                        : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
                <span
                  className={`text-[8px] font-bold tabular-nums tracking-widest mt-0.5 ${
                    isActive ? "text-slate-400" : "text-slate-300 opacity-0"
                  }`}
                >
                  0{idx + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
