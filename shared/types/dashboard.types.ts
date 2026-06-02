export type SalesSummary = {
    totalRevenue: number;
    ticketsSold: number;
    refundedAmount: number;
    payoutsIssued: number;
};

export type RevenueAnalyticsPoint = {
    label: string;
    from: string;
    to: string;
    thisPeriod: number;
    lastPeriod: number;
};

export type SalesReportsResponse = {
    summary: SalesSummary;
    revenueAnalytics: {
        period: string;
        total: number;
        points: RevenueAnalyticsPoint[];
    };
    recentTransactions: unknown[];
};
