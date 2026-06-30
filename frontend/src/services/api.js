import axios from "axios";

const api = axios.create({
    baseURL: "http://34.57.61.83/api",
});

export default api;