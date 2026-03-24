import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://api.hashcase.co" //"http://localhost:8001"
      : "https://api.hashcase.co",
});
