import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.openai.com/v1",
});

export default axiosInstance;
