import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cw-hookhub.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  }, // Replace with your API base URL
});

export default axiosInstance;
