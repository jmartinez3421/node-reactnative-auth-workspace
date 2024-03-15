import * as SecureStore from "expo-secure-store";
import axios, { AxiosRequestConfig } from "axios";

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
