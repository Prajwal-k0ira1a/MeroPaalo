import { ArrowRight, Send } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-slate-900 -z-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-[1200px] mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          <Send size={10} /> Get Started Now
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight max-w-2xl mx-auto">
          Ready to transform your <br />
          <span className="bg-[linear-gradient(90deg,#0d9488,#2563eb,#0d9488)] [background-size:200%_auto] bg-clip-text text-transparent animate-shimmer">
            customer experience?
          </span>
        </h2>

        <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
          Join 50+ leading institutions in Nepal modernizing their lobby operations with MeroPaalo.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="h-14 px-10 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 flex items-center gap-2">
            Request a Demo <ArrowRight size={18} />
          </button>
          <button className="h-14 px-10 bg-white/10 backdrop-blur-xl text-white font-bold rounded-lg border border-white/10 hover:bg-white/20 transition-all flex items-center gap-2">
            View Case Studies
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
