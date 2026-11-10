const API_BASE = "/api";
const TOKEN_KEY = "admin_token";
const USER_KEY = "admin_user";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

async function request<T>(path: string, { method = "GET", body }: RequestOptions = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  let payload: { data?: T; message?: string } | null = null;
  try {
    payload = await res.json();
  } catch {
    /* empty body */
  }

  if (!res.ok) {
    throw new ApiError(payload?.message || "حدث خطأ غير متوقع", res.status);
  }
  return payload!.data as T;
}

export type AuthUser = { token: string; name: string; email: string; role: string };
export type SessionUser = { name: string; email: string; role: string };

export type Booking = {
  id: number;
  customerName: string;
  customerPhone?: string;
  city?: string;
  eventDate?: string;
  duration?: number;
  guests?: number;
  totalPrice?: number;
  status: string;
  details?: string;
  extras?: string[];
  createdAt: string;
};

export type Provider = {
  id: number;
  name: string;
  gender: string;
  city: string;
  rating: number;
  reviews: number;
  experience?: string;
  specialties?: string[];
  pricePerHour?: number;
  verified: boolean;
  available: boolean;
  image?: string;
};

export type Package = {
  id: number;
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
  includes: string[];
  color?: string;
  priceValue?: number;
};

export type Testimonial = { id: number; n: string; c?: string; t: string };

export type Stats = {
  totalProviders: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalPackages: number;
  totalTestimonials: number;
  unreadMessages: number;
  totalRevenue: number;
  averageRating: number;
};

export const auth = {
  login: (email: string, password: string) =>
    request<AuthUser>("/auth/login", { method: "POST", body: { email, password } }),
  verify: () => request<SessionUser>("/auth/verify"),
};

export const bookingsApi = {
  list: () => request<Booking[]>("/bookings"),
  setStatus: (id: number, status: string) =>
    request<Booking>(`/bookings/${id}/status`, { method: "PUT", body: { status } }),
  remove: (id: number) => request<{ success: boolean }>(`/bookings/${id}`, { method: "DELETE" }),
};

export const providersApi = {
  list: () => request<Provider[]>("/providers"),
  create: (data: Partial<Provider>) => request<Provider>("/providers", { method: "POST", body: data }),
  update: (id: number, data: Partial<Provider>) =>
    request<Provider>(`/providers/${id}`, { method: "PUT", body: data }),
  remove: (id: number) => request<{ success: boolean }>(`/providers/${id}`, { method: "DELETE" }),
};

export const packagesApi = {
  list: () => request<Package[]>("/packages"),
  create: (data: Partial<Package>) => request<Package>("/packages", { method: "POST", body: data }),
  update: (id: number, data: Partial<Package>) =>
    request<Package>(`/packages/${id}`, { method: "PUT", body: data }),
  remove: (id: number) => request<{ success: boolean }>(`/packages/${id}`, { method: "DELETE" }),
};

export const testimonialsApi = {
  list: () => request<Testimonial[]>("/testimonials"),
  create: (data: { n: string; c?: string; t: string }) =>
    request<Testimonial>("/testimonials", { method: "POST", body: data }),
  remove: (id: number) => request<{ success: boolean }>(`/testimonials/${id}`, { method: "DELETE" }),
};

export const dashboardApi = {
  stats: () => request<Stats>("/dashboard/stats"),
};

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  save: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
