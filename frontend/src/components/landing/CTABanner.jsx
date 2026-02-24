import { ArrowRight } from "lucide-react";

const CTABanner = () => (
  <section className="relative py-24 px-6 overflow-hidden bg-slate-900">
    {/* Subtle teal glow */}
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />

    <div className="max-w-6xl mx-auto text-center relative z-10">

      <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded mb-6">
        Get Started Now
      </span>

      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight max-w-2xl mx-auto">
        Ready to transform your{" "}
        <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
          customer experience?
        </span>
      </h2>

      <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
        Join 50+ leading institutions in Nepal modernising their lobby operations
        with MeroPaalo.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <button className="h-14 px-10 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-all shadow-xl flex items-center gap-2">
          Request a Demo <ArrowRight size={18} />
        </button>
        <button className="h-14 px-10 bg-white/10 text-white font-bold rounded-lg border border-white/10 hover:bg-white/20 transition-all">
          View Case Studies
        </button>
      </div>

    </div>
  </section>
);

export default CTABanner;
