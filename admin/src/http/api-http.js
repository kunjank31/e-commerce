import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const userLogin = (data) => api.post("/auth/login", data);
export const productCreate = (data) => api.post("/product/create", data);
export const logout = () => api.get("/auth/logout");
export const productFetch = () => api.get("/products");
export const productDelete = (id) => api.delete("/product/delete/" + id);
export const userDelete = (id) => api.delete("/user/delete/" + id);
export const userFetch = () => api.get("/users");
export const singleUser = (id) => api.get("/user/" + id);
export const getOrders = () => api.get("/orders");
export const getProductStats = (id) => api.get("/order/stats" + id);
export const getUserStats = () => api.get("/auth/stats");
export const getIncome = () => api.get("/order/income");


// axios interceptors

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
        return error
      }
    }
    throw error;
  }
);
