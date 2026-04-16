import axios from "axios";
//const BASEURLs="http://localhost:5019/api/v1";
const BASEURL="https://realtimechat-backend-up49.onrender.com/api/v1";
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL=BASEURL;
axiosInstance.defaults.withCredentials=true;

//export const BackUrls= "http://localhost:5019" ;
export const BackUrl = "https://realtimechat-backend-up49.onrender.com" ;

export default axiosInstance;
