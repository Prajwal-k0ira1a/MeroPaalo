import { Check, ArrowRight } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "NPR 4,999",
      period: "/month",
      desc: "For small clinics and local offices.",
      features: ["Up to 2 counters", "500 customers/day", "Basic SMS alerts", "Standard analytics"],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Professional",
      price: "NPR 12,499",
      period: "/month",
      desc: "Ideal for busy bank branches and hospitals.",
      features: ["Up to 10 counters", "Unlimited customers", "WhatsApp & SMS", "Signage TV Support", "Priority Support"],
      cta: "Request Demo",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "Multi-branch solutions for corporations.",
      features: ["Unlimited counters", "Multi-branch dashboard", "Custom API integration", "On-site installation", "SLA Guarantee"],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-[120px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block font-semibold text-[0.7rem] tracking-[0.05em] uppercase text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded mb-4">
            Investment
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Transparent Pricing</h2>
          <p className="text-slate-500 text-lg">
            Choose a plan that scales with your business needs. No hidden setup fees.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-lg border transition-all duration-300 ${
                p.highlight
                  ? "border-teal-200 bg-teal-50/30 shadow-xl lg:scale-105 z-10"
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {p.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-slate-900">{p.price}</span>
                  <span className="text-slate-400 text-sm font-medium">{p.period}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>

              <div className="space-y-4 mb-8">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <Check size={16} className="text-teal-600 flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <button
                className={`w-full h-11 rounded font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  p.highlight
                    ? "bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20"
                    : "bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {p.cta} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
