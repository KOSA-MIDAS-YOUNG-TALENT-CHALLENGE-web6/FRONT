import axios from "axios";
import config from "../config/config.json";

const customAxios = axios.create({
  baseURL: config.SERVER,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default customAxios;
