import axios from "axios";

const API = axios.create({
  baseURL: 'https://hirehub-app-h2g8.vercel.app',
  withCredentials: true
});

export default API

// baseURL: import.meta.env.VITE_API_URL,