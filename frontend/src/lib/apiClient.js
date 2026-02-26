// Central API client for production
// Handles base URL, authentication, error handling, and request formatting

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const { body, headers = {}, token, ...rest } = options;
  const requestHeaders = { ...headers };
  const hasJsonBody =
    body !== undefined &&
    body !== null &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams);

  if (hasJsonBody && !requestHeaders["Content-Type"]) {
    requestHeaders["Content-Type"] = "application/json";
  }
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      credentials: "include",
      ...rest,
      headers: requestHeaders,
      body: hasJsonBody ? JSON.stringify(body) : body,
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      const message =
        (isJson && payload?.message) || `Request failed (${res.status})`;
      // Global error logging
      console.error("API Error:", message, { path, options, payload });
      throw new Error(message);
    }

    return payload;
  } catch (error) {
    // Global error logging
    console.error("API Request Exception:", error, { path, options });
    throw error;
  }
}

export { API_BASE };
