import axios from "axios";
import { getLanguage } from "../utils/localStorage";

if (process.env.NODE_ENV !== "development") {
  axios.defaults.baseURL = "/api";
}
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
axios.defaults.headers["Accept-Language"] = getLanguage() || "en";
axios.defaults.headers["Cache-Control"] =
  "no-store, no-cache, must-revalidate, proxy-revalidate";

export const axiosReq = axios.create();
export const axiosRes = axios.create();
