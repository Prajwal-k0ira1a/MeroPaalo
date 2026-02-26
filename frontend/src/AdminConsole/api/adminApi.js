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
  getDepartments: () =>
    request(withQuery("/departments")),
  createDepartment: (payload) =>
    request("/departments", {
      method: "POST",
      body: { ...payload },
    }),
  updateDepartment: (departmentId, payload) =>
    request(`/departments/${departmentId}`, {
      method: "PATCH",
      body: { ...payload },
    }),
  deleteDepartment: (departmentId) =>
    request(`/departments/${departmentId}`, {
      method: "DELETE",
    }),
  getDashboard: (departmentId) =>
    request(withQuery("/admin/dashboard", { department: departmentId })),
  getTokens: (departmentId) =>
    request(withQuery("/tokens", { department: departmentId })),
  getCounters: (departmentId) =>
    request(withQuery("/counters", { department: departmentId })),
  createCounter: (_unusedInstitutionId, payload) =>
    request("/counters", {
      method: "POST",
      body: { ...payload },
    }),
  updateCounter: (counterId, _unusedInstitutionId, payload) =>
    request(`/counters/${counterId}`, {
      method: "PATCH",
      body: { ...payload },
    }),
  assignCounterStaff: (counterId, _unusedInstitutionId, staffId) =>
    request(`/counters/${counterId}/assign-staff`, {
      method: "PATCH",
      body: { staffId },
    }),
  getUsers: (role) => request(withQuery("/users", { role })),
  assignUserRole: (userId, role) =>
    request(`/users/${userId}/role`, {
      method: "PATCH",
      body: { role },
    }),
  assignUserDepartment: (userId, departmentId) =>
    request(`/users/${userId}/department`, {
      method: "PATCH",
      body: { departmentId: departmentId || null },
    }),
  getQueueDays: (departmentId) =>
    request(withQuery("/queue-days", { department: departmentId })),
  openQueueDay: (_unusedInstitutionId, departmentId, date, startTime = "09:00", endTime = "17:00") =>
    request("/queue-days/open", {
      method: "POST",
      body: {
        department: departmentId,
        date,
        startTime,
        endTime,
      },
    }),
  closeQueueDay: (queueDayId) =>
    request(`/queue-days/${queueDayId}/close`, {
      method: "PATCH",
    }),
  serveNext: (departmentId, counterId, _unusedInstitutionId) =>
    request("/tokens/serve-next", {
      method: "POST",
      body: { department: departmentId, counterId },
    }),
  issueToken: (_unusedInstitutionId, departmentId) =>
    request("/tokens/issue", {
      method: "POST",
      body: { department: departmentId },
    }),
};
