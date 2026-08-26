import axios from "axios";

// Points at the Express backend in ../../backend.
const API_URL = import.meta.env.VITE_API_URL || "https://finovia.onrender.com/api";

const api = axios.create({ baseURL: API_URL });

// Helper to generate UUIDv4 client-side request IDs
function generateRequestId() {
  return "req-" + Math.random().toString(36).substring(2, 10) + "-" + Date.now().toString(36);
}

// Interceptor: Attach JWT & X-Request-ID header to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("finovia_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers["X-Request-ID"] = generateRequestId();
  return config;
});

// Interceptor: Centralized response & error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns structured error message or response data
    const resData = error.response?.data;
    if (resData && typeof resData === "object") {
      error.message = resData.error?.message || resData.message || error.message;
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data) => api.post("/auth/register", data).then((r) => r.data),
  login: (data) => api.post("/auth/login", data).then((r) => r.data),
  me: () => api.get("/auth/me").then((r) => r.data),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }).then((r) => r.data),
  resetPassword: (data) => api.post("/auth/reset-password", data).then((r) => r.data),
  sendOtp: (email) => api.post("/auth/send-otp", { email }).then((r) => r.data),
  verifyOtp: (email, code) => api.post("/auth/verify-otp", { email, code }).then((r) => r.data),
  changePassword: (data) => api.put("/auth/change-password", data).then((r) => r.data),
};

// One function per resource - each mirrors a backend route module.
const resource = (path) => ({
  getAll: (params) => api.get(`/${path}`, { params }).then((r) => r.data),
  getOne: (id) => api.get(`/${path}/${id}`).then((r) => r.data),
});

export const creditCardsApi = resource("credit-cards");
export const bankAccountsApi = resource("bank-accounts");
export const dematAccountsApi = resource("demat-accounts");
export const loansApi = resource("loans");
export const insuranceApi = resource("insurance");
export const offersApi = resource("offers");
export const blogApi = resource("blog");

export const applicationsApi = {
  apply: (data) => api.post("/applications", data).then((r) => r.data),
  mine: () => api.get("/applications/me").then((r) => r.data),
  getAll: () => api.get("/applications").then((r) => r.data),
  getOne: (id) => api.get(`/applications/${id}`).then((r) => r.data),
  stats: () => api.get("/applications/stats").then((r) => r.data),
  update: (id, data) => api.put(`/applications/${id}`, data).then((r) => r.data),
};

export const usersApi = {
  getAll: () => api.get("/users").then((r) => r.data),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }).then((r) => r.data),
  remove: (id) => api.delete(`/users/${id}`).then((r) => r.data),
};

export const wishlistApi = {
  mine: () => api.get("/users/wishlist/me").then((r) => r.data),
  add: (productType, productId) => api.post("/users/wishlist", { productType, productId }).then((r) => r.data),
  remove: (productId) => api.delete(`/users/wishlist/${productId}`).then((r) => r.data),
};

export const adminApi = {
  stats: () => api.get("/admin/stats").then((r) => r.data),
};

// Generic write helpers (create/update/delete) for the admin panel
const writable = (path) => ({
  create: (data) => api.post(`/${path}`, data).then((r) => r.data),
  update: (id, data) => api.put(`/${path}/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/${path}/${id}`).then((r) => r.data),
});

export const adminResourceApi = {
  creditCards: { ...creditCardsApi, ...writable("credit-cards") },
  bankAccounts: { ...bankAccountsApi, ...writable("bank-accounts") },
  dematAccounts: { ...dematAccountsApi, ...writable("demat-accounts") },
  loans: { ...loansApi, ...writable("loans") },
  insurance: { ...insuranceApi, ...writable("insurance") },
  offers: { ...offersApi, ...writable("offers") },
  blog: { ...blogApi, ...writable("blog") },
};

export const bulkDataApi = {
  executePipeline: (model, operation, data, filter) => {
    let payload = { model, operation };
    if (operation === "createMany" || operation === "upsertMany") {
      payload.data = data;
    } else if (operation === "updateMany") {
      payload.where = filter || {};
      payload.data = Array.isArray(data) ? data[0] : data;
    } else {
      payload.data = data;
    }
    return api.post("/data/bulk", payload).then((r) => r.data);
  },
};

export default api;
