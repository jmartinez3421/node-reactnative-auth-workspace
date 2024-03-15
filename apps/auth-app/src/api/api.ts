import * as SecureStore from "expo-secure-store";
import axios, { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";

const host = Constants.expoGoConfig?.debuggerHost?.split(":")?.[0];
const API_URL = process.env.EXPO_PUBLIC_API_URL || "";

export const baseURL =
    host &&
    (host.startsWith("192.168") || host.startsWith("10.") || host.startsWith("172.")) &&
    (API_URL.indexOf("localhost") > -1 || API_URL.indexOf("127.0.0.1") > -1)
        ? "http://" + host + ":" + (API_URL.split(":").pop() || "")
        : API_URL;

const api = axios.create({
    baseURL,
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

api.interceptors.response.use((response) => response.data);

declare module "axios" {
    export interface AxiosInstance {
        request<T extends object>(config: AxiosRequestConfig): Promise<T>;
        get<T extends object>(url: string, config?: AxiosRequestConfig): Promise<T>;
        delete<T extends object>(url: string, config?: AxiosRequestConfig): Promise<T>;
        head<T extends object>(url: string, config?: AxiosRequestConfig): Promise<T>;
        post<T extends object>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        put<T extends object>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        patch<T extends object>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    }
}

export default api;
