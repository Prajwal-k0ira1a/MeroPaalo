import {
  ArrowRight,
  PauseCircle,
  RefreshCw,
  RotateCcw,
  Play,
  Square,
  Plus,
} from "lucide-react";

const actions = [
  { icon: Play, label: "Start Queue", onClickKey: "onActivateQueue" },
  { icon: RefreshCw, label: "Refresh Queue", onClickKey: "onRefresh" },
  { icon: Plus, label: "Issue Token", onClickKey: "onIssueToken" },
  { icon: PauseCircle, label: "Serve Next Token", onClickKey: "onServeNext" },
  { icon: RotateCcw, label: "Regenerate Queue", onClickKey: "onResetQueue" },
  { icon: Square, label: "Close Queue", onClickKey: "onCloseQueue" },
];

export default function QuickActions({
  onRefresh,
  onServeNext,
  onResetQueue,
  onActivateQueue,
  onCloseQueue,
  onIssueToken,
  actionLoading,
}) {
  const handlers = {
    onRefresh,
    onServeNext,
    onResetQueue,
    onActivateQueue,
    onCloseQueue,
    onIssueToken,
  };

  return (
    <div className="flex flex-col gap-3">
      {actions.map((item) => {
        const Icon = item.icon;
        const handler = handlers[item.onClickKey];
        return (
          <button
            key={item.label}
            onClick={handler}
            disabled={actionLoading || !handler}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
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
