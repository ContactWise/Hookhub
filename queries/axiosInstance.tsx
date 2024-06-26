import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cw-hookhub.azurewebsites.net", // Replace with your API base URL
});

export default axiosInstance;
