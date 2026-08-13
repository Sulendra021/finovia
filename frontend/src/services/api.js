import axios from "axios";

// Points at the Express backend in ../../backend. Falls back to localhost
// if VITE_API_URL isn't set (see .env.example).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

// Attach the JWT (if the user is logged in) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("finovia_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  register: (data) => api.post("/auth/register", data).then((r) => r.data),
  login: (data) => api.post("/auth/login", data).then((r) => r.data),
  me: () => api.get("/auth/me").then((r) => r.data),
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
  stats: () => api.get("/applications/stats").then((r) => r.data),
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

// Generic write helpers (create/update/delete) for the admin panel, layered on
// top of the same `resource()` GET helpers already defined above.
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

export default api;
