import { AlertCircle, Home, BarChart3, Clock } from "lucide-react";

const Problem = () => {
  const problems = [
    {
      icon: <Clock className="text-red-500" />,
      title: "Unpredictable Wait Times",
      desc: "Customers hate the unknown. Eliminate anxiety with AI-driven real-time estimates.",
    },
    {
      icon: <Home className="text-red-500" />,
      title: "Crowded Lobbies",
      desc: "Physical queues consume prime space. Reclaim your lobby for better service quality.",
    },
    {
      icon: <BarChart3 className="text-red-500" />,
      title: "Lack of Staff Visibility",
      desc: "If you can't measure it, you can't improve it. Paper tokens hide operational gaps.",
    },
  ];

  return (
    <section id="problem" className="py-[120px] bg-slate-50/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block font-semibold text-[0.7rem] tracking-[0.05em] uppercase text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded mb-4">
            The Challenge
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">The Cost of Physical Queues</h2>
          <p className="text-slate-500 text-lg">
            Traditional queuing systems are broken. They create stress for customers and blind spots for management.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual — "the old way" */}
          <div className="relative aspect-video bg-white/70 backdrop-blur-xl border border-slate-200 rounded-lg shadow-xl overflow-hidden flex flex-col items-center justify-center gap-6 p-8">
            <div className="absolute top-0 right-0 p-3 bg-red-50 border-b border-l border-red-100 rounded-bl-lg text-[10px] font-bold text-red-600 uppercase tracking-widest flex items-center gap-1.5">
              <AlertCircle size={10} /> The Old Way
            </div>

            <div className="flex gap-2 items-end h-24 mb-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 bg-slate-200 rounded-t-sm"
                  style={{ height: `${40 + Math.random() * 60}%`, opacity: 0.3 + i * 0.05 }}
                />
              ))}
            </div>

            <div className="text-center">
              <div className="font-bold text-slate-800 mb-1">Chaos &amp; Uncertainty</div>
              <p className="text-sm text-slate-500 max-w-xs">
                Paper tickets, long standing waits, and zero data for optimization.
              </p>
            </div>
          </div>

          {/* Problem list */}
          <div className="space-y-10">
            {problems.map((p, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-12 h-12 rounded-md bg-white border border-slate-100 shadow-sm flex items-center justify-center flex-shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
