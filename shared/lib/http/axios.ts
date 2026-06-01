import axios from "axios";
import {tokenStore} from "@/shared/lib/tokenStore";
import {authEvents} from "@/shared/lib/auth/authEvents";
import {refreshAccessToken} from "@/shared/lib/http/refresh";


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config: any) => {
    if (config.skipAuth) return config;

    const token = tokenStore.get();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config;

        if (!error.response) return Promise.reject(error);
        if (original?.url?.includes("/auth/refresh")) return Promise.reject(error);

        if (error.response.status === 401 && original && !original._retry) {
            original._retry = true;

            try {
                const newToken = await refreshAccessToken();
                original.headers = original.headers ?? {};
                original.headers.Authorization = `Bearer ${newToken}`;
                return api(original);
            } catch {
                tokenStore.clear();
                authEvents.emitLogout();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
