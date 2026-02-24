import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Navigation links
const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add background when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm"
          : "bg-transparent"
        }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 select-none">
          <span className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm shadow">
            M
          </span>
          <span className="font-bold text-slate-900 text-lg tracking-tight">
            Mero<span className="text-teal-600">Paalo</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Log in
          </Link>
          <a
            href="#"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-all shadow-md"
          >
            Request Demo <ArrowRight size={14} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-3">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-slate-700 hover:text-teal-600 transition-colors"
            >
              {label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-center text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Log in
            </Link>
            <a
              href="#"
              className="py-2.5 text-center text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Request Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
