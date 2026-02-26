import { authApi } from "../api";

export const authService = {
  async login(email, password) {
    const data = await authApi.login({ email, password });
    return data?.data?.user;
  },

  async register(name, email, password) {
    const data = await authApi.register({ name, email, password });
    return data?.data?.user;
  },

  async logout() {
    return authApi.logout();
  },

  async forgotPassword(email) {
    return authApi.forgotPassword(email);
  },
};
