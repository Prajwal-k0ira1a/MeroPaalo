import DashboardMock from "./DashboardMock";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

// Shared label used across all sections
const SectionLabel = ({ text }) => (
  <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded mb-4">
    {text}
  </span>
);

const Hero = () => (
  <section
    id="hero"
    className="relative min-h-screen pt-24 flex items-center overflow-hidden [background-image:radial-gradient(circle,#cbd5e1_1px,transparent_1px)] [background-size:28px_28px]"
  >
    {/* Soft background blobs */}
    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-100/30 rounded-full blur-[120px] -z-10" />
    <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-[100px] -z-10" />

    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">

      {/* Left: copy */}
      <div className="max-w-xl">
        <SectionLabel text="Now v2.0 is Out" />

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-up">
          End the Wait,{" "}
          <span className="block mt-2 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Empower Flow
          </span>
        </h1>

        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
          Intelligent digital queuing for modern institutions. Transform chaotic
          lobbies into streamlined, data-driven customer experiences.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-8 h-12 rounded-lg hover:bg-teal-700 transition-all hover:-translate-y-px">
            Start Free Trial <ArrowRight size={18} />
          </button>
          <button className="inline-flex items-center gap-2 text-slate-700 font-medium px-8 h-12 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all">
            <Play size={16} className="fill-slate-600" /> Watch Demo
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[10, 11, 12, 13].map(i => (
              <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 shadow overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-9 h-9 rounded-full border-2 border-white bg-teal-500 flex items-center justify-center text-[10px] font-bold text-white shadow">
              +40
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle size={14} className="text-teal-600" /> Trusted by 50+ Banks
            </p>
            <p className="text-xs text-slate-500">Across Nepal and Southeast Asia</p>
          </div>
        </div>
      </div>

      {/* Right: dashboard preview */}
      <div className="hidden lg:flex justify-center items-center relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-50 to-blue-50 rounded-3xl -rotate-2 -z-10 scale-105" />
        <DashboardMock />
      </div>

    </div>
  </section>
);

export default Hero;
