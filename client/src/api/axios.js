import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true                 //is required for HTTP-only cookies
});

export default API;
