import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-estate-mern-api-om1e.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
