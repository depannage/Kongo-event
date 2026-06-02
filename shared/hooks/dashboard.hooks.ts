import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/shared/services/dashboard.service";

export function useSalesReports() {
    return useQuery({
        queryKey: ["dashboard", "sales"],
        queryFn: () => dashboardService.getSalesReports(),
    });
}
