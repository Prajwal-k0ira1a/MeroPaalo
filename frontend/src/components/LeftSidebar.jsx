import { Bell, BarChart3, Zap, Users, TrendingUp, Clock } from "lucide-react";

export const LeftSidebar = () => {
  return (
    <aside className="hidden lg:flex w-2/5 flex-col justify-between p-10 text-white relative overflow-hidden bg-slate-900">
      {/* Background decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/*Content */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold tracking-tight">MeroPaalo</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl font-extrabold leading-tight mb-4 tracking-tight">
          Smarter queues,
          <br />
          <span className="text-teal-400">happier customers.</span>
        </h2>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
          Join 500+ institutions reducing wait times by up to 45% through
          intelligent real-time queue management.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <Users size={18} className="text-teal-400 mx-auto mb-1" />
            <p className="text-white font-bold text-base">500+</p>
            <p className="text-slate-500 text-[10px] uppercase font-semibold">
              Institutions
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <TrendingUp size={18} className="text-teal-400 mx-auto mb-1" />
            <p className="text-white font-bold text-base">45%</p>
            <p className="text-slate-500 text-[10px] uppercase font-semibold">
              Faster
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <Clock size={18} className="text-teal-400 mx-auto mb-1" />
            <p className="text-white font-bold text-base">99.9%</p>
            <p className="text-slate-500 text-[10px] uppercase font-semibold">
              Uptime
            </p>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-teal-500/15 border border-teal-500/30 rounded-lg flex items-center justify-center">
              <Bell size={14} className="text-teal-400" />
            </div>
            <span className="text-slate-300 text-sm">
              Real-time SMS Notifications
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-teal-500/15 border border-teal-500/30 rounded-lg flex items-center justify-center">
              <BarChart3 size={14} className="text-teal-400" />
            </div>
            <span className="text-slate-300 text-sm">
              Advanced Performance Analytics
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-teal-500/15 border border-teal-500/30 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-teal-400" />
            </div>
            <span className="text-slate-300 text-sm">
              Cloud-native High Availability
            </span>
          </div>
        </div>
      </div>

      {/*Testimonial*/}
      <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm mt-8">
        <p className="text-teal-400 text-3xl font-serif mb-1 leading-none">“</p>
        <p className="text-slate-300 text-sm italic leading-relaxed mb-4">
          MeroPaalo transformed our patient flow. Our lobby has never been more
          organised and patients appreciate the transparency.
        </p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold text-xs shadow-sm">
            SC
          </div>
          <div>
            <p className="text-white text-sm font-bold">Dr. Sarah Chen</p>
            <p className="text-slate-500 text-[11px]">
              Director, City General Hospital
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
