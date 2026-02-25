import { apiRequest } from "../../lib/apiClient";

const request = async (path, options = {}) => {
  const json = await apiRequest(path, options);
  return json?.data;
};

const withQuery = (path, query = {}) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, value);
    }
  });
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
};

export const adminApi = {
  getInstitutions: () => request("/institutions"),
  getDepartments: (institutionId) =>
    request(withQuery("/departments", { institution: institutionId })),
  getDashboard: (departmentId, institutionId) =>
    request(withQuery("/admin/dashboard", { department: departmentId, institution: institutionId })),
  getTokens: (departmentId, institutionId) =>
    request(withQuery("/tokens", { department: departmentId, institution: institutionId })),
  getCounters: (departmentId, institutionId) =>
    request(withQuery("/counters", { department: departmentId, institution: institutionId })),
  createCounter: (institutionId, payload) =>
    request("/counters", {
      method: "POST",
      body: { institution: institutionId, ...payload },
    }),
  updateCounter: (counterId, institutionId, payload) =>
    request(`/counters/${counterId}`, {
      method: "PATCH",
      body: { institution: institutionId, ...payload },
    }),
  assignCounterStaff: (counterId, institutionId, staffId) =>
    request(`/counters/${counterId}/assign-staff`, {
      method: "PATCH",
      body: { institution: institutionId, staffId },
    }),
  getUsers: (role) => request(withQuery("/users", { role })),
  openQueueDay: (institutionId, departmentId, date, startTime = "09:00", endTime = "17:00") =>
    request("/queue-days/open", {
      method: "POST",
      body: {
        institution: institutionId,
        department: departmentId,
        date,
        startTime,
        endTime,
      },
    }),
  serveNext: (departmentId, counterId, institutionId) =>
    request("/tokens/serve-next", {
      method: "POST",
      body: { institution: institutionId, department: departmentId, counterId },
    }),
  issueToken: (institutionId, departmentId) =>
    request("/tokens/issue", {
      method: "POST",
      body: { institution: institutionId, department: departmentId },
    }),
};
