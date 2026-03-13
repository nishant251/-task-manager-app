import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-app-cxn7.onrender.com/api"
});

export default API;