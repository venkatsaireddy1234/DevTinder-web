// const rawBaseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:7777" || "/api";
// export const BASE_URL = rawBaseUrl.replace(/\/+$/, "");



// Local 
export const BASE_URL = location.hostname === 'localhost'  ? "http://localhost:7777" : "/api"
