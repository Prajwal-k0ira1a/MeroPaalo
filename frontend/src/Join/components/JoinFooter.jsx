/**
 * JoinFooter — Refined
 * Understated but polished. Teal accent on the left border,
 * white background — confident, not loud.
 */
export default function JoinFooter() {
    return (
        <footer className="w-full border-t border-slate-100 bg-white">
            <div className="max-w-4xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                {/* Brand mark with left teal accent */}
                <div className="flex items-center gap-3">
                    <div className="w-0.5 h-8 bg-teal-500 rounded-full" />
                    <div>
                        <p className="text-sm font-bold text-slate-800 font-display">MeroPaalo</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-display">Virtual Queue Service</p>
                    </div>
                </div>

                {/* Links — low emphasis, understated */}
                <div className="flex items-center gap-6 text-xs text-slate-400">
                    <a href="#" className="hover:text-slate-700 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-slate-700 transition-colors">Support</a>
                    <span>© 2025</span>
                </div>

            </div>
        </footer>
    );
}
