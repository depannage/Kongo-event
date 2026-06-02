import { api } from "@/shared/lib/http/api";
import type { SalesReportsResponse } from "@/shared/types/dashboard.types";

export type SalesReportsPeriod = "day" | "week" | "month" | "year";

export const dashboardService = {
    async getSalesReports(period: SalesReportsPeriod = "month"): Promise<SalesReportsResponse> {
        const res = await api.get<SalesReportsResponse>("/dashboard/sales", {
            params: { period },
        });
        return res.data;
    },
};
