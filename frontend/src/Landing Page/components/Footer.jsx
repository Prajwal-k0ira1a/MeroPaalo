import { Twitter, Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const columns = [
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

  return (
    <footer className="pt-20 pb-10 bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded flex items-center justify-center bg-teal-600 text-white font-bold">
                M
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">MeroPaalo</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
              Intelligent queuing solutions for modern institutions in Nepal. Helping you deliver premium service with zero friction.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Mail size={16} className="text-teal-600" /> contact@meropaalo.com
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <MapPin size={16} className="text-teal-600" /> Dharan, Nepal
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Phone size={16} className="text-teal-600" /> +977 1 4XXXXXX
              </div>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
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
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs font-medium">
            © {new Date().getFullYear()} MeroPaalo Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: <Twitter size={16} />, label: "Twitter" },
              { icon: <Linkedin size={16} />, label: "LinkedIn" },
              { icon: <Youtube size={16} />, label: "YouTube" },
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                aria-label={social.label}
                className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
