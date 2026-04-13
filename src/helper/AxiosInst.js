import axios from "axios";
const BASEURL="https://realtimechat-backend-up49.onrender.com/api/v1";
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL=BASEURL;
axiosInstance.defaults.withCredentials=true;

export const BackUrl = "https://realtimechat-backend-up49.onrender.com" ;

export default axiosInstance;
