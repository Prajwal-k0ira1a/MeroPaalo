import { apiRequest } from "../lib/apiClient";

export const authService = {
  async login(email, password) {
    const json = await apiRequest("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    return json?.data?.user;
  },

  async register(name, email, password) {
    const json = await apiRequest("/auth/register", {
      method: "POST",
      body: { name, email, password },
    });
    return json?.data?.user;
  },

  async logout() {
    return apiRequest("/auth/logout", { method: "POST" });
  },

  async forgotPassword(email) {
    return apiRequest("/auth/forgot-password", {
      method: "POST",
      body: { email },
    });
  },
};
