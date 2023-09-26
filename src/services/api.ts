import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_APP_API_URL,
});
