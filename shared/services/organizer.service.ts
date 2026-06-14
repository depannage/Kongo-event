import { api } from "@/shared/lib/http/api";
import type { ApiListResponse, Organizer } from "@/shared/types/organizer.types";

const BASE_PATH = "/api/v1/organizers";

function normalizeOrganizersResponse(payload: unknown): Organizer[] {
  if (Array.isArray(payload)) {
    return payload as Organizer[];
  }

  if (payload && typeof payload === "object") {
    const data = payload as Record<string, unknown>;

    if (Array.isArray(data.items)) {
      return data.items as Organizer[];
    }

    if (Array.isArray(data.data)) {
      return data.data as Organizer[];
    }
  }

  return [];
}

export const organizerService = {
  async getOrganizers(): Promise<ApiListResponse<Organizer>> {
    const res = await api.get(BASE_PATH);
    const items = normalizeOrganizersResponse(res.data);

    if (res.data && typeof res.data === "object" && "items" in res.data) {
      return res.data as ApiListResponse<Organizer>;
    }

    return {
      items,
      total: items.length,
    };
  },
};
