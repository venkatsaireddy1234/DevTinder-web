const rawBaseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:7777";
export const BASE_URL = rawBaseUrl.replace(/\/+$/, "");
