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

export const staffApi = {
  getCounters: (departmentId) =>
    request(withQuery("/counters", { department: departmentId })),
  getTokens: (departmentId, status) =>
    request(withQuery("/tokens", { department: departmentId, status })),
  serveNext: (departmentId, counterId) =>
    request("/tokens/serve-next", {
      method: "POST",
      body: { department: departmentId, counterId },
    }),
  callToken: (tokenId, counterId) =>
    request(`/tokens/${tokenId}/call`, {
      method: "PATCH",
      body: { counterId },
    }),
  serveToken: (tokenId, counterId) =>
    request(`/tokens/${tokenId}/serve`, {
      method: "PATCH",
      body: { counterId },
    }),
  completeToken: (tokenId, counterId) =>
    request(`/tokens/${tokenId}/complete`, {
      method: "PATCH",
      body: { counterId },
    }),
  getQueueDays: (departmentId) =>
    request(withQuery("/queue-days", { department: departmentId })),
  openQueueDay: (departmentId, date, startTime = "09:00", endTime = "17:00") =>
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
  resetQueueDay: (queueDayId) =>
    request(`/queue-days/${queueDayId}/reset`, {
      method: "POST",
    }),
  issueToken: (departmentId) =>
    request("/tokens/issue", {
      method: "POST",
      body: { department: departmentId },
    }),
};
