import { api } from "@/shared/lib/http/api";
import { tokenStore } from "@/shared/lib/tokenStore";
import type {
    AuthResponse,
    AuthUser,
    ForgotPasswordPayload,
    LoginPayload,
    MessageResponse,
    RefreshTokenPayload,
    RegisterPayload,
    ResendSmsPayload,
    ResetPasswordPayload,
    SendOtpPayload,
    VerifyOtpPayload,
    VerifyOtpResponse,
} from "../types/auth.types";

function saveAuthTokens(data: AuthResponse) {
    if (data?.accessToken) {
        tokenStore.set(data.accessToken);
    }

    if (data?.refreshToken) {
        tokenStore.setRefresh(data.refreshToken);
    }
}

export const authService = {
    async register(payload: RegisterPayload): Promise<AuthResponse> {
        const res = await api.post("/auth/register", payload, { skipAuth: true } as any);
        saveAuthTokens(res.data);
        return res.data;
    },

    async login(payload: LoginPayload): Promise<AuthResponse> {
        const res = await api.post("/auth/login", payload, { skipAuth: true } as any);
        saveAuthTokens(res.data);
        return res.data;
    },

    async refreshToken(payload: RefreshTokenPayload): Promise<AuthResponse> {
        const res = await api.post("/auth/refresh-token", payload, { skipAuth: true } as any);
        saveAuthTokens(res.data);
        return res.data;
    },

    async logout(): Promise<MessageResponse> {
        const res = await api.post("/auth/logout", {});
        tokenStore.clear();

        if (typeof window !== "undefined") {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("auth_user");
        }

        return res.data;
    },

    async me(): Promise<AuthUser> {
        const res = await api.get("/auth/me");
        return res.data;
    },

    async forgotPassword(payload: ForgotPasswordPayload): Promise<MessageResponse> {
        const res = await api.post("/auth/forgot-password", payload, { skipAuth: true } as any);
        return res.data;
    },

    async sendOtp(payload: SendOtpPayload): Promise<MessageResponse> {
        const res = await api.post("/auth/send-otp", payload, { skipAuth: true } as any);
        return res.data;
    },

    async verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
        const res = await api.post("/auth/verify-otp", payload, { skipAuth: true } as any);
        return res.data;
    },

    async resetPassword(payload: ResetPasswordPayload): Promise<MessageResponse> {
        const res = await api.post("/auth/reset-password", payload, { skipAuth: true } as any);
        return res.data;
    },

    async resendSms(payload: ResendSmsPayload): Promise<MessageResponse> {
        const res = await api.post("/auth/resend-sms", payload, { skipAuth: true } as any);
        return res.data;
    },
};
