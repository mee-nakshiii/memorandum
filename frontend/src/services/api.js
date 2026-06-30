import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://34.57.61.83/api",
});

export default api;