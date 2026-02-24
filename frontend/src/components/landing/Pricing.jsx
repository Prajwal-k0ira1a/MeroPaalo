import { Check, ArrowRight } from "lucide-react";

// Shared section label component
const SectionLabel = ({ text }) => (
  <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded mb-4">
    {text}
  </span>
);

const PLANS = [
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
    features: ["Up to 10 counters", "Unlimited customers", "WhatsApp & SMS", "Signage TV support", "Priority support"],
    cta: "Request Demo",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Multi-branch solutions for corporations.",
    features: ["Unlimited counters", "Multi-branch dashboard", "Custom API integration", "On-site installation", "SLA guarantee"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="py-28 bg-white">
    <div className="max-w-6xl mx-auto px-6">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <SectionLabel text="Pricing" />
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Transparent Pricing</h2>
        <p className="text-slate-500 text-lg">
          Choose a plan that scales with your business. No hidden setup fees.
        </p>
      </div>

      {/* Plan cards */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {PLANS.map(({ name, price, period, desc, features, cta, highlight }) => (
          <div
            key={name}
            className={`relative p-8 rounded-xl border transition-all duration-200 ${highlight
                ? "border-teal-200 bg-teal-50/40 shadow-xl lg:scale-105 z-10"
                : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
              }`}
          >
            {/* Most popular badge */}
            {highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow">
                Most Popular
              </div>
            )}

            {/* Plan info */}
            <div className="mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{name}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-extrabold text-slate-900">{price}</span>
                <span className="text-slate-400 text-sm">{period}</span>
              </div>
              <p className="text-slate-500 text-sm">{desc}</p>
            </div>

            {/* Feature list */}
            <ul className="space-y-3 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <Check size={15} className="text-teal-600 shrink-0" /> {f}
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <button
              className={`w-full h-11 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${highlight
                  ? "bg-teal-600 text-white hover:bg-teal-700 shadow-lg"
                  : "bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100"
                }`}
            >
              {cta} <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default Pricing;
