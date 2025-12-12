import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const TOKEN_KEY = "auth_token";

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common["Authorization"];
  }
}

// Initialize from storage
const existing = localStorage.getItem(TOKEN_KEY);
if (existing) {
  api.defaults.headers.common["Authorization"] = `Bearer ${existing}`;
}
// Debugging: expose baseURL and current auth header in console
console.info('[api] baseURL ->', api.defaults.baseURL);
console.info('[api] Authorization header ->', api.defaults.headers.common['Authorization']);

export function getApiBaseUrl() {
  return api.defaults.baseURL;
}

export default api;
