"use client";

import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from "chart.js";
import {
    CalendarDays,
    CircleDollarSign,
    CircleHelp,
    Gauge,
    Info,
    ListFilter,
    RefreshCcw,
    Search,
    Ticket,
    TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar } from "react-chartjs-2";
import { useSidebar } from "@/contexts/SidebarContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Chart Data
const CHART_DATA = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
    datasets: [
        {
            label: "Revenue",
            data: [15000, 18800, 14000, 17800, 23200, 21500, 18600, 17800, 20500, 23200, 15000, 18800],
            backgroundColor: "rgba(37, 99, 235, 0.12)",
            borderRadius: 10,
            barThickness: 28,
            categoryPercentage: 0.65,
            barPercentage: 0.8,
        },
        {
            label: "Tickets Sold",
            data: [7400, 9200, 6800, 8800, 11400, 10600, 9200, 8800, 10100, 11500, 7300, 9200],
            backgroundColor: "rgba(37, 99, 235, 1)",
            borderRadius: 10,
            barThickness: 28,
            categoryPercentage: 0.65,
            barPercentage: 0.8,
        },
    ],
};

const CHART_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top" as const,
            align: "end" as const,
            labels: {
                boxWidth: 10,
                boxHeight: 10,
                usePointStyle: true,
                pointStyle: "circle",
                color: "#64748b",
                font: { size: 12, weight: 500 },
            },
        },
        tooltip: {
            backgroundColor: "#0f172a",
            padding: 12,
            callbacks: {
                label: (context: any) =>
                    `${context.dataset.label}: $${Number(context.raw).toLocaleString()}`,
            },
        },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { color: "#64748b", font: { size: 12 } },
        },
        y: {
            beginAtZero: true,
            max: 25000,
            grid: { color: "#e5e7eb" },
            ticks: {
                stepSize: 5000,
                callback: (value: string | number) => {
                    const numericValue = Number(value);
                    return numericValue === 0 ? "0" : `$${numericValue / 1000}K`;
                },
            },
        },
    },
};

// Mock Data
const UPCOMING_EVENTS = [
    { id: 1, title: "Startup Summit 2025", date: "May 22, 2025" },
    { id: 2, title: "Indie Music Fest", date: "May 24, 2025" },
    { id: 3, title: "Tech Workshop: AI Tools", date: "May 25, 2025" },
    { id: 4, title: "Food Carnival 2025", date: "June 1, 2025" },
    { id: 5, title: "Photography Bootcamp", date: "June 5, 2025" },
];

const RECENT_EVENTS = [
    { id: 1, name: "Cultural Fusion Fest 2025", date: "Mar 15, 2024, 3 PM", tickets: "456 / 500" },
    { id: 2, name: "Kinshasa Music Night", date: "Apr 12, 2024, 6 PM", tickets: "320 / 400" },
    { id: 3, name: "Business Expo", date: "May 20, 2024, 10 AM", tickets: "120 / 300" },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CALENDAR_DATES = [19, 20, 21, 22, 23, 24, 25];

// Main Dashboard Component
export default function DashboardPage() {
    const t = useTranslations("dashboard");
    const { isCollapsed } = useSidebar();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <DashboardSidebar />

            <div className={`transition-all duration-300 ${
                isCollapsed ? "lg:ml-[80px]" : "lg:ml-[280px]"
            }`}>
                <DashboardNavbar />

                <main className="p-4 sm:p-6 lg:p-8">
                    {/* Header Actions */}
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="text-sm text-slate-500">
                            {t("breadcrumbHome")} / <span className="text-slate-900 font-semibold">{t("title")}</span>
                        </div>

                        <div className="flex gap-3">
                            <button className="px-5 py-2.5 rounded border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:shadow-sm transition-all">
                                {t("generateReport")}
                            </button>
                            <button className="px-5 py-2.5 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 hover:shadow-md transition-all">
                                {t("createEvent")}
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        <MetricCard
                            icon={<CircleDollarSign className="size-5" />}
                            title={t("metrics.totalTicketsSold")}
                            value="2,130"
                            trend="+10.5%"
                            trendUp={true}
                        />
                        <MetricCard
                            icon={<Gauge className="size-5" />}
                            title={t("metrics.totalRevenue")}
                            value="$78,500"
                            trend="+15.2%"
                            trendUp={true}
                        />
                        <MetricCard
                            icon={<CalendarDays className="size-5" />}
                            title={t("metrics.upcomingEvents")}
                            value="5"
                            trend="+2"
                            trendUp={true}
                        />
                        <MetricCard
                            icon={<Ticket className="size-5" />}
                            title={t("metrics.checkinsCompleted")}
                            value="1,480"
                            trend="-2.1%"
                            trendUp={false}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - 2/3 width */}
                        <div className="lg:col-span-2 space-y-6">
                            <SalesAnalytics title={t("analytics")} />
                            <UpcomingEventsTable
                                title={t("upcomingEvents")}
                                search={t("search")}
                                eventName={t("eventName")}
                                dateTime={t("dateTime")}
                                status={t("status")}
                                ticketsSold={t("ticketsSold")}
                                active={t("active")}
                            />
                        </div>

                        {/* Right Column - 1/3 width */}
                        <div className="space-y-6">
                            <DeadlineCalendar
                                title={t("deadlineCalendar")}
                                upcomingLabel={t("upcoming")}
                            />
                            <HelpBox
                                title={t("helpTitle")}
                                description={t("helpDescription")}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Metric Card Component
function MetricCard({ icon, title, value, trend, trendUp }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
}) {
    return (
        <div className="bg-white rounded border border-slate-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded bg-blue-50 text-blue-600">
                    {icon}
                </div>
                <Info className="size-4 text-slate-300 cursor-pointer hover:text-slate-400 transition-colors" />
            </div>
            <p className="text-sm text-slate-500 mb-1">{title}</p>
            <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}>
                    <TrendingUp className={`size-3 inline mr-1 ${!trendUp && "rotate-180"}`} />
                    {trend}
                </span>
            </div>
        </div>
    );
}

// Sales Analytics Component
function SalesAnalytics({ title }: { title: string }) {
    return (
        <div className="bg-white rounded border border-slate-200 hover:shadow-lg transition-all">
            <div className="p-5 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            </div>
            <div className="p-5">
                <div className="h-[320px]">
                    <Bar data={CHART_DATA} options={CHART_OPTIONS} />
                </div>
            </div>
        </div>
    );
}

// Deadline Calendar Component
function DeadlineCalendar({ title, upcomingLabel }: { title: string; upcomingLabel: string }) {
    return (
        <div className="bg-white rounded border border-slate-200 hover:shadow-lg transition-all">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                <button className="p-2 rounded border border-slate-200 hover:bg-slate-50 transition-colors">
                    <RefreshCcw className="size-4 text-slate-400" />
                </button>
            </div>

            <div className="p-5">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {WEEKDAYS.map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Dates */}
                <div className="grid grid-cols-7 gap-1 mb-6">
                    {CALENDAR_DATES.map(date => (
                        <div key={date} className="text-center">
                            <span className={`inline-flex items-center justify-center w-9 h-9 text-sm font-medium rounded transition-colors ${
                                date === 22
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-slate-700 hover:bg-slate-100 cursor-pointer"
                            }`}>
                                {date}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Upcoming Events */}
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Upcoming Events</p>
                    {UPCOMING_EVENTS.map(event => (
                        <div key={event.id} className="group p-3 rounded border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer">
                            <div className="border-l-2 border-blue-600 pl-3">
                                <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {event.title}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">{upcomingLabel} • {event.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Upcoming Events Table Component
function UpcomingEventsTable({ title, search, eventName, dateTime, status, ticketsSold, active }: any) {
    return (
        <div className="bg-white rounded border border-slate-200 hover:shadow-lg transition-all">
            <div className="p-5 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg font-bold text-slate-900">{title}</h2>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded border border-slate-200 bg-white focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
                            <Search className="size-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder={search}
                                className="text-sm outline-none bg-transparent"
                            />
                        </div>
                        <button className="p-2 rounded border border-slate-200 hover:bg-slate-50 transition-colors">
                            <ListFilter className="size-4 text-slate-400" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-5 py-3 text-left w-12">
                            <input type="checkbox" className="rounded border-slate-300" />
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{eventName}</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{dateTime}</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{status}</th>
                        <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{ticketsSold}</th>
                        <th className="px-5 py-3 text-left w-12"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {RECENT_EVENTS.map(event => (
                        <tr key={event.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                            <td className="px-5 py-4">
                                <input type="checkbox" className="rounded border-slate-300" />
                            </td>
                            <td className="px-5 py-4 font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                                {event.name}
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-500">{event.date}</td>
                            <td className="px-5 py-4">
                                    <span className="inline-flex px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-600">
                                        {active}
                                    </span>
                            </td>
                            <td className="px-5 py-4 text-sm font-medium text-slate-700">{event.tickets}</td>
                            <td className="px-5 py-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                •••
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Help Box Component
function HelpBox({ title, description }: { title: string; description: string }) {
    return (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded p-6 text-white text-center hover:shadow-xl transition-all">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded bg-white/20 mb-4">
                <CircleHelp className="size-7" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-blue-100">{description}</p>
            <button className="mt-4 px-4 py-2 bg-white/20 rounded text-sm font-semibold hover:bg-white/30 transition-colors">
                Learn More
            </button>
        </div>
    );
}
