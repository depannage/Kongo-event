"use client";

import { useMemo, useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { MOCK_TRANSACTIONS } from "@/components/report/constants/mock-transactions";
import { RecentTransactions } from "@/components/report/RecentTransactions";
import { ReportsHeader } from "@/components/report/ReportsHeader";
import { ReportsMetricsGrid } from "@/components/report/ReportsMetricsGrid";
import { RevenueAnalytics } from "@/components/report/RevenueAnalytics";
import type { SalesMetrics } from "@/components/report/types";
import { useSidebar } from "@/contexts/SidebarContext";
import { useSalesReports } from "@/shared/hooks/dashboard.hooks";

const EMPTY_METRICS: SalesMetrics = {
    totalRevenue: 0,
    ticketsSold: 0,
    refundedAmount: 0,
    payoutsIssued: 0,
};

export function ReportsView() {
    const { isCollapsed } = useSidebar();
    const { data: salesReports, isLoading: isSalesLoading } = useSalesReports();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const metrics: SalesMetrics = salesReports?.summary ?? EMPTY_METRICS;

    const filteredTransactions = useMemo(() => {
        return MOCK_TRANSACTIONS.filter((transaction) => {
            const matchesSearch =
                transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus =
                filterStatus === "all" ||
                transaction.status.toLowerCase() === filterStatus.toLowerCase();
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, filterStatus]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <DashboardSidebar />

            <div
                className={`transition-all duration-300 ${
                    isCollapsed ? "lg:ml-[80px]" : "lg:ml-[280px]"
                }`}
            >
                <DashboardNavbar />

                <main className="p-4 sm:p-6 lg:p-8">
                    <ReportsHeader />
                    <ReportsMetricsGrid metrics={metrics} isLoading={isSalesLoading} />
                    <RevenueAnalytics />
                    <RecentTransactions
                        transactions={filteredTransactions}
                        totalCount={MOCK_TRANSACTIONS.length}
                        searchTerm={searchTerm}
                        onSearchTermChange={setSearchTerm}
                        filterStatus={filterStatus}
                        onFilterStatusChange={setFilterStatus}
                    />
                </main>
            </div>
        </div>
    );
}
