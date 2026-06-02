import { useQuery } from "@tanstack/react-query";
import {
    dashboardService,
    type SalesReportsPeriod,
} from "@/shared/services/dashboard.service";

export function useSalesReports(period: SalesReportsPeriod = "month") {
    return useQuery({
        queryKey: ["dashboard", "sales", period],
        queryFn: () => dashboardService.getSalesReports(period),
    });
}
