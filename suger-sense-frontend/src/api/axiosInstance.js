import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://sugarsense-server-web.onrender.com/api",
});

export default axiosInstance;
