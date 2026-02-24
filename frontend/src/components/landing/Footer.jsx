import { Twitter, Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Hardware", "Signage App"],
  },
  {
    title: "Company",
    links: ["About Us", "Contact", "Careers", "Case Studies"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "System Status", "Help Center"],
  },
];

const SOCIAL = [
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
];

const Footer = () => (
  <footer className="pt-16 pb-10 bg-slate-50 border-t border-slate-200">
    <div className="max-w-6xl mx-auto px-6">

      {/* Main grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

        {/* Brand info */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">MeroPaalo</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
            Intelligent queuing solutions for modern institutions in Nepal.
            Delivering premium service with zero friction.
          </p>
          <ul className="space-y-3">
            {[
              { icon: Mail, text: "contact@meropaalo.com" },
              { icon: MapPin, text: "Dharan, Nepal" },
              { icon: Phone, text: "+977 1 4XXXXXX" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 text-slate-500 text-sm">
                <Icon size={15} className="text-teal-600 shrink-0" /> {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Link columns */}
        {COLUMNS.map(({ title, links }) => (
          <div key={title}>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-widest mb-5">
              {title}
            </h4>
            <ul className="space-y-3">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-500 text-sm hover:text-teal-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-xs">
          © {new Date().getFullYear()} MeroPaalo Technologies. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {SOCIAL.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>

    </div>
  </footer>
);

export default Footer;
