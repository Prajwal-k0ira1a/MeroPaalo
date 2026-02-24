import { AlertCircle, Home, BarChart3, Clock } from "lucide-react";

// Shared section label component
const SectionLabel = ({ text }) => (
  <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded mb-4">
    {text}
  </span>
);

const PROBLEMS = [
  {
    icon: Clock,
    title: "Unpredictable Wait Times",
    desc: "Customers hate the unknown. Eliminate anxiety with AI-driven real-time estimates.",
  },
  {
    icon: Home,
    title: "Crowded Lobbies",
    desc: "Physical queues consume prime space. Reclaim your lobby for better service quality.",
  },
  {
    icon: BarChart3,
    title: "Lack of Staff Visibility",
    desc: "If you can't measure it, you can't improve it. Paper tokens hide operational gaps.",
  },
];

const Problem = () => (
  <section id="problem" className="py-28 bg-slate-50">
    <div className="max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <SectionLabel text="The Challenge" />
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          The Cost of Physical Queues
        </h2>
        <p className="text-slate-500 text-lg">
          Traditional queuing systems are broken — they create stress for
          customers and blind spots for management.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Visual: "the old way" */}
        <div className="relative aspect-video bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center gap-6 p-8">
          <div className="absolute top-0 right-0 p-2.5 bg-red-50 border-b border-l border-red-100 rounded-bl-lg flex items-center gap-1.5 text-[10px] font-bold text-red-600 uppercase tracking-widest">
            <AlertCircle size={10} /> The Old Way
          </div>
          <div className="flex gap-2 items-end h-24">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="w-5 bg-slate-200 rounded-t"
                style={{ height: `${50 + i * 5}%` }}
              />
            ))}
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-800 mb-1">Chaos & Uncertainty</p>
            <p className="text-sm text-slate-500 max-w-xs">
              Paper tickets, long standing waits, and zero data for
              optimisation.
            </p>
          </div>
        </div>

        {/* Problem list */}
        <div className="space-y-8">
          {PROBLEMS.map(({ icon, title, desc }) => {
            const Icon = icon;
            return (
              <div key={title} className="flex gap-5">
                <div className="w-11 h-11 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Problem;
