import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const login = (data) => api.post("/auth/login", data);
export const productFetch = (data) =>
  api.get(data ? "/products?name=" + data : "/products");
export const singleProduct = (id) => api.get("/product/" + id);
export const getOrder = (data) => api.get("/orders" + data);
export const logoutUser = () => api.get("/auth/logout");
export const paymentMade = (data) => api.post("/payment", data);
export const orderCreate = (data) => api.post("/order/create", data);
export const resetPassword = (id, data) =>
  api.put("/user/update/password/" + id, data);
export const forgetPassword = (data) => api.put("/user/forget-password", data);
export const updateUser = (data) => api.put("/user/update", data);

// axios interceptor

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_URL}/auth/refresh`, {
          withCredentials: true,
        });
        return api.request(originalRequest);
      } catch (error) {
        return error;
      }
    }
    throw error;
  }
);
