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

/** Transaction telle que renvoyée par GET /dashboard/sales */
export type RecentTransaction = {
    id: string;
    name: string;
    email: string;
    ticketType: string;
    purchaseDate: string;
    status: string;
    amount: number;
};

export type SalesReportsResponse = {
    summary: SalesSummary;
    revenueAnalytics: {
        period: string;
        total: number;
        points: RevenueAnalyticsPoint[];
    };
    recentTransactions: RecentTransaction[];
};
