import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HASHCASE_API_URL || "https://api.hashcase.co",
});
