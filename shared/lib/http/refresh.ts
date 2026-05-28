import { api } from "@/shared/lib/http/api";
import { tokenStore } from "@/shared/lib/tokenStore";

export async function refreshAccessToken() {
    const refreshToken = tokenStore.getRefresh();

    if (!refreshToken) {
        tokenStore.clear();
        throw new Error("Refresh token introuvable");
    }

    const res = await api.post(
        "/auth/refresh-token",
        { refreshToken },
        { skipAuth: true } as any
    );

    const accessToken = res.data?.accessToken;

    if (accessToken) {
        tokenStore.set(accessToken);
    }

    if (res.data?.refreshToken) {
        tokenStore.setRefresh(res.data.refreshToken);
    }

    return accessToken;
}
