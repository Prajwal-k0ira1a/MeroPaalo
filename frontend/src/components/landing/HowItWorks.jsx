import { QrCode, Smartphone, BellRing } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      icon: <QrCode className="text-teal-600" size={28} />,
      title: "Scan to Start",
      desc: "Customers scan a QR code at the entrance or via your website. No app download required.",
    },
    {
      num: "02",
      icon: <Smartphone className="text-blue-600" size={28} />,
      title: "Join the Queue",
      desc: "Select service type and enter details. A digital token is issued instantly to their phone.",
    },
    {
      num: "03",
      icon: <BellRing className="text-teal-600" size={28} />,
      title: "Real-time Updates",
      desc: "Customers relax anywhere. We notify them via SMS/WhatsApp when their turn is approaching.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-30 bg-white border-y border-slate-100"
    >
      <div className="max-w-300 mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-block font-semibold text-[0.7rem] tracking-[0.05em] uppercase text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded mb-4">
            Simplicity First
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            A Zero-Friction Experience
          </h2>
          <p className="text-slate-500 text-lg">
            We designed MeroPaalo to be intuitive for both your customers and
            your staff.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[100px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />

          {steps.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-lg bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                  {s.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center shadow-md">
                  {s.num}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {s.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-20 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-lg p-8 text-center max-w-4xl mx-auto">
          <p className="text-slate-700 font-medium italic">
            "We saw a{" "}
            <span className="text-teal-600 font-bold">40% reduction</span> in
            perceived wait times within the first month of implementation."
          </p>
          <div className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            — Digital Head, Citizen Bank Nepal
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
