import { api } from "@/shared/lib/http/api";
import type { SalesReportsResponse } from "@/shared/types/dashboard.types";

export const dashboardService = {
    async getSalesReports(): Promise<SalesReportsResponse> {
        const res = await api.get<SalesReportsResponse>("/dashboard/sales");
        return res.data;
    },
};
