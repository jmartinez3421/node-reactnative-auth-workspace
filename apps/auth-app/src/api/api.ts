import * as SecureStore from "expo-secure-store";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL ?? "",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("session");
    if (token) {
        config.headers["X-Auth"] = token;
    }
    return config;
});

export default api;
