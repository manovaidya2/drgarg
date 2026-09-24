import axios from "axios";

const normalizeApiBaseUrl = (value) => {
  const baseUrl = value.replace(/\/+$/, "");
  return /\/api$/i.test(baseUrl) ? baseUrl : `${baseUrl}/api`;
};

const API_BASE_URL = normalizeApiBaseUrl(
  import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV
      ? "http://localhost:5003"
      : "https://api.drankushgarg.com"),
);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
