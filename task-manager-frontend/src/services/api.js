import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-app-w0ax.onrender.com"
});

export default API;