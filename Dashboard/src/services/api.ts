import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://qahwa.xemsys.com/api"; // production via Cloudflare Tunnel

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || err.message || "حدث خطأ";
    return Promise.reject(new Error(msg));
  }
);

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }).then((r) => r.data.data),
  verify: () => api.get("/auth/verify").then((r) => r.data.data),

  // New full-spec OTP flow (phone based)
  sendOtp: (phoneNumber: string) =>
    api.post("/auth/send-otp", { phoneNumber }).then((r) => r.data.data),
  verifyOtp: (phoneNumber: string, otpCode: string) =>
    api.post("/auth/verify-otp", { phoneNumber, otpCode }).then((r) => r.data.data),
  refreshToken: (refreshToken: string) =>
    api.post("/auth/refresh-token", { refreshToken }).then((r) => r.data.data),
};

export const providersApi = {
  getAll: (city?: string, gender?: string) =>
    api.get("/providers", { params: { city, gender } }).then((r) => r.data.data),
  getById: (id: number) =>
    api.get(`/providers/${id}`).then((r) => r.data.data),
  create: (data: any) =>
    api.post("/providers", data).then((r) => r.data.data),
  update: (id: number, data: any) =>
    api.put(`/providers/${id}`, data).then((r) => r.data.data),
  delete: (id: number) =>
    api.delete(`/providers/${id}`).then((r) => r.data),
};

export const bookingsApi = {
  getAll: () => api.get("/bookings").then((r) => r.data.data),
  getById: (id: number) =>
    api.get(`/bookings/${id}`).then((r) => r.data.data),
  create: (data: any) =>
    api.post("/bookings", data).then((r) => r.data.data),
  updateStatus: (id: number, status: string) =>
    api.put(`/bookings/${id}/status`, { status }).then((r) => r.data.data),
  delete: (id: number) =>
    api.delete(`/bookings/${id}`).then((r) => r.data),
};

export const packagesApi = {
  getAll: () => api.get("/packages").then((r) => r.data.data),
  create: (data: any) =>
    api.post("/packages", data).then((r) => r.data.data),
  update: (id: number, data: any) =>
    api.put(`/packages/${id}`, data).then((r) => r.data.data),
  delete: (id: number) =>
    api.delete(`/packages/${id}`).then((r) => r.data),
};

export const testimonialsApi = {
  getAll: () => api.get("/testimonials").then((r) => r.data.data),
  create: (data: any) =>
    api.post("/testimonials", data).then((r) => r.data.data),
  delete: (id: number) =>
    api.delete(`/testimonials/${id}`).then((r) => r.data),
};

export const dashboardApi = {
  getStats: () => api.get("/dashboard/stats").then((r) => r.data.data),
};

export default api;
