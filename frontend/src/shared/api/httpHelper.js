import axios from "axios";
import { baseURL } from "./baseUrl";
import { getToken } from "../utils/utils";

export const httpHelper = axios.create({
  withCredentials: true,
  baseURL: baseURL(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  }
});

httpHelper.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);