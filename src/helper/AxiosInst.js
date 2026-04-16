import axios from "axios";
const BASEURL="http://localhost:5019/api/v1";
//const BASEURLs="https://realtimechat-backend-up49.onrender.com/api/v1";
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL=BASEURL;
axiosInstance.defaults.withCredentials=true;

export const BackUrl = "http://localhost:5019" ;
//export const BackUrls = "https://realtimechat-backend-up49.onrender.com" ;

export default axiosInstance;
