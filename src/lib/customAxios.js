import axios from "axios";
import config from "../config/config.json";

const customAxios = axios.create({
  baseURL: config.SERVER, 
  timeout: 1000,
  headers: {
    Authorization:`Bearer eyJ0eXBlIjoiYWNjZXNzIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJkbGNrZGdrcjAzMjBAbmF2ZXIuY29tIiwicm9sZSI6IldPUktFUiIsImlhdCI6MTY2NzQ4NTgyNiwiZXhwIjo2ODMzNDE1MjQ5Mn0.t7CCGqrKsY8IXC3R3iWsvbPSETmsWtJshPKIEdQrGu0`,
  },
});

export default customAxios;
