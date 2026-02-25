import { ArrowRight, PauseCircle, RefreshCw } from "lucide-react";

const actions = [
  { icon: RefreshCw, label: "Transfer Patient" },
  { icon: PauseCircle, label: "Take a Break" },
];

export default function QuickActions() {
  return (
    <div className="flex flex-col gap-3">
      {actions.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <div className="rounded-lg bg-slate-100 p-2">
              <Icon size={16} className="text-slate-600" />
            </div>
            <span className="flex-1 text-left">{item.label}</span>
            <ArrowRight size={16} className="text-slate-400" />
          </button>
        );
      })}
    </div>
  );
}
