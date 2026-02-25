const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });

  const text = await res.text();
  let json = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = {};
  }

  if (!res.ok) {
    throw new Error(json.message || `Request failed (${res.status})`);
  }

  return json.data;
};

export const adminApi = {
  getDepartments: () => request("/departments"),
  getDashboard: (departmentId) =>
    request(`/admin/dashboard?department=${encodeURIComponent(departmentId)}`),
  getTokens: (departmentId) =>
    request(`/tokens?department=${encodeURIComponent(departmentId)}`),
  getCounters: (departmentId) =>
    request(`/counters?department=${encodeURIComponent(departmentId)}`),
  serveNext: (departmentId, counterId) =>
    request("/tokens/serve-next", {
      method: "POST",
      body: JSON.stringify({ department: departmentId, counterId }),
    }),
  issueToken: (institutionId, departmentId) =>
    request("/tokens/issue", {
      method: "POST",
      body: JSON.stringify({ institution: institutionId, department: departmentId }),
    }),
};
