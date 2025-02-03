import axios from "axios";
import { getLanguage } from '../utils/utils';

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
axios.defaults.headers["Accept-Language"] = getLanguage() || "en";

export const axiosReq = axios.create();
export const axiosRes = axios.create();
