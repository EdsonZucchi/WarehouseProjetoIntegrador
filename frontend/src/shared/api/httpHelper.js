import axios from "axios";
import { baseURL } from "./baseUrl";

export const httpHelper = axios.create({
  withCredentials: true,
  baseURL: baseURL(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
