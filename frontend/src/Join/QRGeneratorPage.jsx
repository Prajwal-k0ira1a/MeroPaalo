import { useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const CLIENT_BASE = import.meta.env.VITE_CLIENT_BASE_URL || window.location.origin;

export const QRGeneratorPage = () => {
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");

  const canGenerate = Boolean(institution.trim() && department.trim());

  const joinLink = useMemo(() => {
    if (!canGenerate) return "";
    const params = new URLSearchParams({
      institution: institution.trim(),
      department: department.trim(),
    });
    return `${CLIENT_BASE}/join?${params.toString()}`;
  }, [canGenerate, institution, department]);

  const qrImageUrl = useMemo(() => {
    if (!canGenerate) return "";
    const params = new URLSearchParams({
      institution: institution.trim(),
      department: department.trim(),
    });
    return `${API_BASE}/qr?${params.toString()}`;
  }, [canGenerate, institution, department]);

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <section className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase">MeroPaalo</p>
        <h1 className="text-2xl font-bold text-slate-900 mt-2">QR Generator</h1>
        <p className="text-sm text-slate-600 mt-1">
          Choose institution and department IDs, then generate QR for customer join flow.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <label className="text-sm font-medium text-slate-700">
            Institution ID
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              placeholder="67dc... (ObjectId)"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Department ID
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              placeholder="67dd... (ObjectId)"
            />
          </label>
        </div>

        {canGenerate && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50">
              <p className="text-xs font-semibold text-slate-500">Join Link</p>
              <p className="text-sm break-all text-slate-800">{joinLink}</p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 flex justify-center bg-white">
              <img src={qrImageUrl} alt="Queue QR code" className="w-64 h-64 object-contain" />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
