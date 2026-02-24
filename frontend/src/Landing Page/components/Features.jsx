import { BarChart3, MessageSquare, Monitor, LayoutGrid, Tablet, ShieldCheck } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BarChart3 className="text-teal-600" size={24} />,
      title: "Real-time Analytics",
      desc: "Monitor live wait times, branch performance, and staff productivity from a single dashboard.",
    },
    {
      icon: <MessageSquare className="text-blue-600" size={24} />,
      title: "Local SMS Gateway",
      desc: "Guaranteed delivery across NTC and Ncell networks with custom sender IDs for your brand.",
    },
    {
      icon: <Monitor className="text-teal-600" size={24} />,
      title: "Digital Signage",
      desc: "Transform any TV in your lobby into a live queue display with a simple browser-based link.",
    },
    {
      icon: <LayoutGrid className="text-blue-600" size={24} />,
      title: "Multi-Counter Flow",
      desc: "Efficiently route customers between counters and departments without losing their place in line.",
    },
    {
      icon: <Tablet className="text-teal-600" size={24} />,
      title: "Self-Service Kiosks",
      desc: "Modern tablet interface for on-site token generation, catering to all types of customers.",
    },
    {
      icon: <ShieldCheck className="text-blue-600" size={24} />,
      title: "Enterprise Grade",
      desc: "Secure role-based access, full audit logs, and 99.9% uptime for mission-critical operations.",
    },
  ];

  return (
    <section id="features" className="py-[120px] bg-slate-50/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="inline-block font-semibold text-[0.7rem] tracking-[0.05em] uppercase text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded mb-4">
            Capabilities
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Everything you need to
            <br />
            manage queues perfectly
          </h2>
          <p className="text-slate-500 text-lg">
            Built for reliability and scale in high-traffic environments like banks, hospitals, and government offices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-white/70 border border-black/[0.06] rounded-lg p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-white"
            >
              <div className="w-12 h-12 rounded bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
