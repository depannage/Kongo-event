import { api } from "@/shared/lib/http/api";
import {
    GetPublicEventsParams,
    PublicEvent,
    PublicEventsResponse, PublicHeroPhoto,
    PublicPromotion
} from "@/shared/types/public-event.types";


function buildQuery(params?: GetPublicEventsParams) {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    if (params?.q) searchParams.set("q", params.q);
    if (params?.category) searchParams.set("category", params.category);
    if (params?.city) searchParams.set("city", params.city);

    const query = searchParams.toString();
    return query ? `?${query}` : "";
}

export const publicService = {
    async getEvents(params?: GetPublicEventsParams): Promise<PublicEventsResponse> {
        const res = await api.get(`/public/events${buildQuery(params)}`, {
            skipAuth: true,
        } as any);

        return res.data;
    },

    async getUpcomingEvents(
        params?: GetPublicEventsParams
    ): Promise<PublicEventsResponse> {
        const res = await api.get(`/public/events/upcoming${buildQuery(params)}`, {
            skipAuth: true,
        } as any);

        return res.data;
    },

    async getEventBySlug(slug: string): Promise<PublicEvent> {
        const res = await api.get(`/public/events/${slug}`, {
            skipAuth: true,
        } as any);

        return res.data;
    },

    async getPromotions(): Promise<PublicPromotion[]> {
        const res = await api.get("/public/promotions", {
            skipAuth: true,
        } as any);

        return res.data?.data ?? res.data;
    },

    async getHeroPhotos(): Promise<PublicHeroPhoto[]> {
        const res = await api.get("/public/hero-photos", {
            skipAuth: true,
        } as any);

        return res.data?.data ?? res.data;
    },
};
