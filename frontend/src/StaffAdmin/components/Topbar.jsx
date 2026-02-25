import { Menu, UserRound, Hash } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600">
          <div className="grid grid-cols-2 gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-2 w-2 rounded-sm bg-white" />
            ))}
          </div>
        </div>
        <span className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">MeroPaalo</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
          <UserRound size={14} className="text-slate-500" />
          <span className="text-sm font-semibold text-slate-700">Alex Johnson</span>
        </div>
        <div className="h-9 w-9 rounded-full border-2 border-slate-200 bg-gradient-to-br from-amber-400 to-orange-500 sm:h-10 sm:w-10" />
      </div>
    </header>
  );
}
