import axios from "axios";

const isTest = import.meta.env.VITE_NODE_ENV === "test";
const API_URL = isTest ? "http://localhost:5200" : import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: API_URL,
});
