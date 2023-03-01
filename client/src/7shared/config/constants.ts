// export const API_PREFIX = "http://192.168.0.230:3001";
export const API_BASE =
  process.env.NODE_ENV === "production"
    ? "http://ateworld.site"
    : "http://localhost:3001";
export const API_PREFIX = `${API_BASE}/api`;
