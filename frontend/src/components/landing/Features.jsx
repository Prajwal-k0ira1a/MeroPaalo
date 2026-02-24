import { BarChart3, MessageSquare, Monitor, LayoutGrid, Tablet, ShieldCheck } from "lucide-react";

// Shared section label component
const SectionLabel = ({ text }) => (
  <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded mb-4">
    {text}
  </span>
);

const FEATURES = [
  {
    icon: BarChart3,
    color: "text-teal-600",
    title: "Real-time Analytics",
    desc: "Monitor live wait times, branch performance, and staff productivity from one dashboard.",
  },
  {
    icon: MessageSquare,
    color: "text-blue-600",
    title: "Local SMS Gateway",
    desc: "Guaranteed delivery across NTC and Ncell networks with custom sender IDs for your brand.",
  },
  {
    icon: Monitor,
    color: "text-teal-600",
    title: "Digital Signage",
    desc: "Transform any lobby TV into a live queue display with a simple browser-based link.",
  },
  {
    icon: LayoutGrid,
    color: "text-blue-600",
    title: "Multi-Counter Flow",
    desc: "Route customers between counters and departments without losing their place in line.",
  },
  {
    icon: Tablet,
    color: "text-teal-600",
    title: "Self-Service Kiosks",
    desc: "Modern tablet interface for on-site token generation, catering to all customers.",
  },
  {
    icon: ShieldCheck,
    color: "text-blue-600",
    title: "Enterprise Grade",
    desc: "Role-based access, full audit logs, and 99.9% uptime for mission-critical operations.",
  },
];

const Features = () => (
  <section id="features" className="py-28 bg-slate-50">
    <div className="max-w-6xl mx-auto px-6">

      {/* Header */}
      <div className="max-w-3xl mb-16">
        <SectionLabel text="Capabilities" />
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Everything you need to<br />manage queues perfectly
        </h2>
        <p className="text-slate-500 text-lg">
          Built for reliability and scale in high-traffic environments like banks,
          hospitals, and government offices.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map(({ icon: Icon, color, title, desc }) => (
          <div
            key={title}
            className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
              <Icon size={22} className={color} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Features;
