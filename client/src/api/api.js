import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${localStorage.getItem("auth-token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
