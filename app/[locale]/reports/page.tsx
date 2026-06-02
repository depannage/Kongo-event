"use client";

import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import {
    CircleDollarSign,
    CreditCard,
    Download,
    Info,
    ListFilter,
    RefreshCcw,
    Search,
    SortAsc,
    Ticket,
    TrendingDown,
    TrendingUp,
    Wallet,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatCurrency, formatNumber } from "@/shared/lib/formatNumber";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { useSidebar } from "@/contexts/SidebarContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);

// Chart Data
const LINE_DATA = {
    labels: [
        "May 01",
        "May 04",
        "May 07",
        "May 10",
        "May 13",
        "May 16",
        "May 19",
        "May 22",
        "May 25",
        "May 28",
        "May 30",
    ],
    datasets: [
        {
            label: "This period",
            data: [4100, 5600, 7400, 5000, 6100, 6100, 7600, 4400, 6900, 5200, 4100],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.08)",
            pointBackgroundColor: "#2563eb",
            pointBorderColor: "#2563eb",
            pointRadius: 0,
            pointHoverRadius: 5,
            tension: 0.35,
            fill: true,
        },
        {
            label: "Last period",
            data: [2700, 2700, 3800, 2800, 3600, 3000, 3500, 2800, 3700, 3000, 2500],
            borderColor: "#bfdbfe",
            backgroundColor: "rgba(191, 219, 254, 0.08)",
            pointRadius: 0,
            pointHoverRadius: 5,
            tension: 0.35,
            fill: true,
        },
    ],
};

const LINE_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top" as const,
            align: "end" as const,
            labels: {
                boxWidth: 8,
                boxHeight: 8,
                usePointStyle: true,
                pointStyle: "circle",
                color: "#64748b",
                font: { size: 12 },
            },
        },
        tooltip: {
            backgroundColor: "#ffffff",
            titleColor: "#0f172a",
            bodyColor: "#64748b",
            borderColor: "#e2e8f0",
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
                title: () => "Total Revenue",
                label: (context: any) =>
                    `${context.dataset.label}: $${Number(context.raw / 1000).toFixed(1)}K`,
            },
        },
    },
    scales: {
        x: {
            grid: {
                color: "#eef2f7",
                borderDash: [4, 4],
            },
            border: { display: false },
            ticks: {
                color: "#94a3b8",
                maxTicksLimit: 6,
                font: { size: 11 },
            },
        },
        y: {
            min: 2000,
            max: 8000,
            grid: { color: "#eef2f7" },
            border: { display: false },
            ticks: {
                stepSize: 2000,
                color: "#94a3b8",
                callback: (value: string | number) => `$${Number(value) / 1000}K`,
                font: { size: 11 },
            },
        },
    },
};

// Mock Data
const TRANSACTIONS = [
    { id: "1", name: "Liam Smith", email: "liamsmith@gmail.com", ticketType: "VIP", purchaseDate: "June 15, 2025", status: "Paid", amount: 150 },
    { id: "2", name: "Sophia Johnson", email: "sophiajohnson@gmail.com", ticketType: "VIP", purchaseDate: "May 30, 2025", status: "Paid", amount: 150 },
    { id: "3", name: "Olivia Brown", email: "oliviabrown@gmail.com", ticketType: "Regular", purchaseDate: "July 4, 2025", status: "Cancelled", amount: 75 },
    { id: "4", name: "Emma Wilson", email: "emmawilson@gmail.com", ticketType: "VIP", purchaseDate: "June 20, 2025", status: "Paid", amount: 150 },
    { id: "5", name: "James Martinez", email: "jamesm@gmail.com", ticketType: "Regular", purchaseDate: "June 18, 2025", status: "Refunded", amount: 75 },
];

export default function ReportsPage() {
    const t = useTranslations("reports");
    const locale = useLocale();
    const { isCollapsed } = useSidebar();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredTransactions = TRANSACTIONS.filter(transaction => {
        const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || transaction.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = 350000;
    const ticketsSold = 48120;
    const refundedAmount = 4200;
    const payoutsIssued = 120500;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <DashboardSidebar />

            <div className={`transition-all duration-300 ${
                isCollapsed ? "lg:ml-[80px]" : "lg:ml-[280px]"
            }`}>
                <DashboardNavbar />

                <main className="p-4 sm:p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-950">
                                {t("title")}
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                {t("breadcrumbHome")} / <span className="text-slate-900 font-medium">{t("breadcrumbDashboard")}</span>
                            </p>
                        </div>

                        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all hover:shadow-sm">
                            <Download className="size-4" />
                            {t("exportCsv")}
                        </button>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        <MetricCard
                            icon={<CircleDollarSign className="size-5" />}
                            title={t("metrics.totalRevenue")}
                            value={formatCurrency(totalRevenue, locale)}
                            trend="up"
                            percentage="+12.5%"
                        />
                        <MetricCard
                            icon={<Ticket className="size-5" />}
                            title={t("metrics.ticketsSold")}
                            value={formatNumber(ticketsSold, locale)}
                            trend="up"
                            percentage="+8.2%"
                        />
                        <MetricCard
                            icon={<RefreshCcw className="size-5" />}
                            title={t("metrics.refundedAmount")}
                            value={formatCurrency(refundedAmount, locale)}
                            trend="down"
                            percentage="-3.1%"
                        />
                        <MetricCard
                            icon={<CreditCard className="size-5" />}
                            title={t("metrics.payoutsIssued")}
                            value={formatCurrency(payoutsIssued, locale)}
                            trend="up"
                            percentage="+15.3%"
                        />
                    </div>

                    {/* Revenue Analytics */}
                    <RevenueAnalytics t={t} />

                    {/* Recent Transactions */}
                    <RecentTransactions
                        t={t}
                        transactions={filteredTransactions}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filterStatus={filterStatus}
                        setFilterStatus={setFilterStatus}
                    />
                </main>
            </div>
        </div>
    );
}

// ==================== Metric Card Component ====================
function MetricCard({
                        icon,
                        title,
                        value,
                        trend,
                        percentage,
                    }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    trend: "up" | "down";
    percentage: string;
}) {
    const isUp = trend === "up";

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                    {icon}
                </div>
                <Info className="size-4 text-slate-300 cursor-pointer hover:text-slate-400 transition-colors" />
            </div>

            <p className="text-sm text-slate-500 mb-1">{title}</p>

            <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    isUp
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                }`}>
          {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                    {percentage}
        </span>
            </div>
        </div>
    );
}

// ==================== Revenue Analytics Component ====================
function RevenueAnalytics({ t }: { t: any }) {
    const [selectedPeriod, setSelectedPeriod] = useState("month");
    const [showComparison, setShowComparison] = useState(true);

    const periods = ["day", "week", "month", "year"];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all mb-6">
            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-slate-900">{t("revenueAnalytics")}</h2>

                <div className="flex items-center gap-3">
                    <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                        {periods.map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    selectedPeriod === period
                                        ? "bg-white text-slate-900 shadow-sm"
                                        : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                {t(period)}
                            </button>
                        ))}
                    </div>
                    <button className="flex size-9 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                        <RefreshCcw className="size-4 text-slate-400" />
                    </button>
                </div>
            </div>

            <div className="px-5 pt-5">
                <div className="flex flex-wrap items-end gap-3">
                    <div>
                        <p className="text-3xl font-bold text-slate-900">$1,302.00</p>
                        <p className="text-xs text-slate-500 mt-1">Total revenue this period</p>
                    </div>
                    <div className="flex items-center gap-2 pb-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold">
              <TrendingDown className="size-3" />
              8.5%
            </span>
                        <span className="text-xs text-slate-400">{t("fromLastPeriod")}</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px] px-4 pb-5 pt-5 sm:px-5">
                <Line data={LINE_DATA} options={LINE_OPTIONS} />
            </div>
        </div>
    );
}

// ==================== Recent Transactions Component ====================
function RecentTransactions({
                                t,
                                transactions,
                                searchTerm,
                                setSearchTerm,
                                filterStatus,
                                setFilterStatus,
                            }: {
    t: any;
    transactions: any[];
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filterStatus: string;
    setFilterStatus: (value: string) => void;
}) {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedRows.length === transactions.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(transactions.map(t => t.id));
        }
    };

    const getStatusColor = (status: string) => {
        switch(status.toLowerCase()) {
            case "paid":
                return "bg-emerald-50 text-emerald-600 border-emerald-200";
            case "cancelled":
                return "bg-rose-50 text-rose-600 border-rose-200";
            case "refunded":
                return "bg-amber-50 text-amber-600 border-amber-200";
            default:
                return "bg-slate-50 text-slate-600 border-slate-200";
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
            <div className="p-5 border-b border-slate-100">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <h2 className="text-lg font-bold text-slate-900">{t("recentTransactions")}</h2>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-slate-200 px-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 sm:w-64">
                            <Search className="size-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder={t("search")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                            />
                        </div>

                        {/* Filter */}
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="h-10 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 outline-none focus:border-blue-400"
                        >
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="refunded">Refunded</option>
                        </select>

                        {/* Sort */}
                        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            <SortAsc className="size-4" />
                            {t("sortBy")}
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="w-12 px-5 py-3">
                            <input
                                type="checkbox"
                                checked={selectedRows.length === transactions.length && transactions.length > 0}
                                onChange={toggleAll}
                                className="rounded border-slate-300"
                            />
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.name")}</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.email")}</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.ticketType")}</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.purchaseDate")}</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.checkinStatus")}</th>
                        <th className="w-12 px-5 py-3"></th>
                    </tr>
                    </thead>

                    <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                            <td className="px-5 py-4">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(transaction.id)}
                                    onChange={() => toggleRow(transaction.id)}
                                    className="rounded border-slate-300"
                                />
                            </td>
                            <td className="px-5 py-4 text-sm font-semibold text-slate-500">{index + 1}</td>
                            <td className="px-5 py-4">
                                <p className="font-semibold text-slate-900">{transaction.name}</p>
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-500">{transaction.email}</td>
                            <td className="px-5 py-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      transaction.ticketType === "VIP"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-slate-50 text-slate-600"
                  }`}>
                    {transaction.ticketType}
                  </span>
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-500">{transaction.purchaseDate}</td>
                            <td className="px-5 py-4 font-semibold text-slate-700">${transaction.amount}</td>
                            <td className="px-5 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                            </td>
                            <td className="px-5 py-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-slate-600">
                                •••
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {transactions.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400">No transactions found</p>
                    </div>
                )}
            </div>

            {/* Footer with pagination */}
            <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                    Showing {transactions.length} of {TRANSACTIONS.length} transactions
                </p>

                <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
                        Previous
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                        1
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                        2
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                        3
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
