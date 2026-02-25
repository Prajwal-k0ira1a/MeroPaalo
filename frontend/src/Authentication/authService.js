const BASE_URL = "http://localhost:5000/api/auth";

const request = async (endpoint, body) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // send/receive httpOnly JWT cookie
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Something went wrong");
  }

  return json.data.user;
};

export const authService = {
  login: (email, password) => request("/login", { email, password }),
  register: (name, email, password) => request("/register", { name, email, password }),
  logout: () =>
    fetch(`${BASE_URL}/logout`, { method: "POST", credentials: "include" }),
};
