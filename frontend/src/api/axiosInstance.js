import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5003/api",
  baseURL: "https://api.drankushgarg.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
