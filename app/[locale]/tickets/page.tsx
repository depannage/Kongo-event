"use client";

import {
    CalendarCheck,
    CircleDollarSign,
    Download,
    Edit,
    Eye,
    EyeOff,
    Info,
    ListFilter,
    Plus,
    Search,
    SortAsc,
    Ticket,
    TrendingUp,
    Trash2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// Mock Data
const TICKET_TYPES = [
    { id: "1", name: "VIP", price: 100, quantity: 200, sold: 180, status: "Active", visibility: "Public", color: "purple" },
    { id: "2", name: "General", price: 50, quantity: 1000, sold: 940, status: "Active", visibility: "Public", color: "blue" },
    { id: "3", name: "Early Bird", price: 40, quantity: 300, sold: 300, status: "Sold Out", visibility: "Hidden", color: "amber" },
    { id: "4", name: "Student", price: 30, quantity: 500, sold: 320, status: "Active", visibility: "Public", color: "green" },
    { id: "5", name: "Group (5+)", price: 45, quantity: 200, sold: 120, status: "Active", visibility: "Public", color: "indigo" },
    { id: "6", name: "Backstage", price: 250, quantity: 50, sold: 50, status: "Sold Out", visibility: "Hidden", color: "pink" },
];

export default function TicketsPage() {
    const t = useTranslations("tickets");
    const { isCollapsed } = useSidebar();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterVisibility, setFilterVisibility] = useState("all");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<"name" | "price" | "sold">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // Filter tickets
    const filteredTickets = TICKET_TYPES.filter(ticket => {
        const matchesSearch = ticket.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || ticket.status.toLowerCase() === filterStatus.toLowerCase();
        const matchesVisibility = filterVisibility === "all" || ticket.visibility.toLowerCase() === filterVisibility.toLowerCase();
        return matchesSearch && matchesStatus && matchesVisibility;
    });

    // Sort tickets
    const sortedTickets = [...filteredTickets].sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === "price") {
            return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        } else {
            return sortOrder === "asc" ? a.sold - b.sold : b.sold - a.sold;
        }
    });

    // Statistics
    const totalTicketsSold = TICKET_TYPES.reduce((sum, t) => sum + t.sold, 0);
    const totalRevenue = TICKET_TYPES.reduce((sum, t) => sum + (t.sold * t.price), 0);
    const totalTicketsRemaining = TICKET_TYPES.reduce((sum, t) => sum + (t.quantity - t.sold), 0);
    const totalCheckins = 1872; // Mock data
    const activeTickets = TICKET_TYPES.filter(t => t.status === "Active").length;
    const soldOutTickets = TICKET_TYPES.filter(t => t.status === "Sold Out").length;

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedRows.length === sortedTickets.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(sortedTickets.map(t => t.id));
        }
    };

    const getStatusColor = (status: string) => {
        return status === "Active"
            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
            : "bg-rose-50 text-rose-600 border-rose-200";
    };

    const getVisibilityColor = (visibility: string) => {
        return visibility === "Public"
            ? "bg-blue-50 text-blue-600 border-blue-200"
            : "bg-amber-50 text-amber-600 border-amber-200";
    };

    const getTicketTypeColor = (color: string) => {
        const colors: Record<string, string> = {
            purple: "bg-purple-50 text-purple-600",
            blue: "bg-blue-50 text-blue-600",
            amber: "bg-amber-50 text-amber-600",
            green: "bg-green-50 text-green-600",
            indigo: "bg-indigo-50 text-indigo-600",
            pink: "bg-pink-50 text-pink-600",
        };
        return colors[color] || "bg-slate-50 text-slate-600";
    };

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
                                {t("ticketTypes.title")}
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                {t("breadcrumbManagement")} / <span className="text-slate-900 font-medium">{t("breadcrumbTickets")}</span>
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                                <Download className="size-4" />
                                Export
                            </button>
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all hover:shadow-md">
                                <Plus className="size-4" />
                                {t("ticketTypes.create")}
                            </button>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        <MetricCard
                            icon={<Ticket className="size-5" />}
                            title={t("metrics.ticketsSold")}
                            value={totalTicketsSold.toLocaleString()}
                            trend="+12.5%"
                            trendUp={true}
                        />
                        <MetricCard
                            icon={<CircleDollarSign className="size-5" />}
                            title={t("metrics.revenueGenerated")}
                            value={`$${totalRevenue.toLocaleString()}`}
                            trend="+8.2%"
                            trendUp={true}
                        />
                        <MetricCard
                            icon={<Ticket className="size-5" />}
                            title={t("metrics.ticketsRemaining")}
                            value={totalTicketsRemaining.toLocaleString()}
                            trend={`${((totalTicketsRemaining / (totalTicketsSold + totalTicketsRemaining)) * 100).toFixed(1)}%`}
                            trendUp={false}
                        />
                        <MetricCard
                            icon={<CalendarCheck className="size-5" />}
                            title={t("metrics.checkinsCompleted")}
                            value={totalCheckins.toLocaleString()}
                            trend="+5.3%"
                            trendUp={true}
                        />
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-5">
                            <h3 className="text-sm font-semibold text-slate-500 mb-3">Ticket Status Overview</h3>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-700">Active Tickets</span>
                                <span className="text-lg font-bold text-emerald-600">{activeTickets}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(activeTickets / TICKET_TYPES.length) * 100}%` }} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">Sold Out</span>
                                <span className="text-lg font-bold text-rose-600">{soldOutTickets}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${(soldOutTickets / TICKET_TYPES.length) * 100}%` }} />
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
                            <h3 className="text-sm font-semibold text-white/80 mb-2">Quick Actions</h3>
                            <p className="text-2xl font-bold mb-3">Manage Tickets</p>
                            <p className="text-sm text-white/70 mb-4">Create new ticket types or edit existing ones</p>
                            <button className="px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                                + Create New Ticket Type
                            </button>
                        </div>
                    </div>

                    {/* Ticket Types Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                        <div className="p-5 border-b border-slate-100">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <h2 className="text-lg font-bold text-slate-900">
                                    {t("ticketTypes.tableTitle")} ({sortedTickets.length})
                                </h2>

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

                                    {/* Filter by Status */}
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="h-10 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 outline-none focus:border-blue-400"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="sold out">Sold Out</option>
                                    </select>

                                    {/* Filter by Visibility */}
                                    <select
                                        value={filterVisibility}
                                        onChange={(e) => setFilterVisibility(e.target.value)}
                                        className="h-10 px-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 outline-none focus:border-blue-400"
                                    >
                                        <option value="all">All Visibility</option>
                                        <option value="public">Public</option>
                                        <option value="hidden">Hidden</option>
                                    </select>

                                    {/* Sort Button */}
                                    <button
                                        onClick={() => {
                                            const nextSort: ("name" | "price" | "sold")[] = ["name", "price", "sold"];
                                            const currentIndex = nextSort.indexOf(sortBy);
                                            const nextSortBy = nextSort[(currentIndex + 1) % nextSort.length];
                                            if (nextSortBy === sortBy) {
                                                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                            } else {
                                                setSortBy(nextSortBy);
                                                setSortOrder("asc");
                                            }
                                        }}
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        <SortAsc className="size-4" />
                                        Sort by {sortBy}
                                        {sortOrder === "asc" ? " ↑" : " ↓"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px]">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="w-12 px-5 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === sortedTickets.length && sortedTickets.length > 0}
                                            onChange={toggleAll}
                                            className="rounded border-slate-300"
                                        />
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("ticketTypes.table.ticketName")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("ticketTypes.table.price")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Available</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("ticketTypes.table.sold")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("ticketTypes.table.salesStatus")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("ticketTypes.table.visibility")}</th>
                                    <th className="w-20 px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                {sortedTickets.map((ticket, index) => {
                                    const available = ticket.quantity - ticket.sold;
                                    const revenue = ticket.sold * ticket.price;
                                    const soldPercentage = (ticket.sold / ticket.quantity) * 100;

                                    return (
                                        <tr key={ticket.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                                            <td className="px-5 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(ticket.id)}
                                                    onChange={() => toggleRow(ticket.id)}
                                                    className="rounded border-slate-300"
                                                />
                                            </td>
                                            <td className="px-5 py-4 text-sm font-semibold text-slate-500">{index + 1}</td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex w-2 h-2 rounded-full bg-${ticket.color}-500`} />
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getTicketTypeColor(ticket.color)}`}>
                                                            {ticket.name}
                                                        </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 font-semibold text-slate-900">${ticket.price}</td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-slate-700">{available}</span>
                                                    <div className="flex-1 max-w-20">
                                                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                                                            <div
                                                                className="bg-blue-500 h-1.5 rounded-full"
                                                                style={{ width: `${soldPercentage}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-slate-600">{ticket.sold} / {ticket.quantity}</td>
                                            <td className="px-5 py-4 font-semibold text-emerald-600">${revenue.toLocaleString()}</td>
                                            <td className="px-5 py-4">
                                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                                                        {ticket.status === "Active" ? t("active") : t("soldOut")}
                                                    </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    {ticket.visibility === "Public" ? (
                                                        <Eye className="size-3.5 text-blue-500" />
                                                    ) : (
                                                        <EyeOff className="size-3.5 text-amber-500" />
                                                    )}
                                                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getVisibilityColor(ticket.visibility)}`}>
                                                            {ticket.visibility === "Public" ? t("public") : t("hidden")}
                                                        </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="Edit">
                                                        <Edit className="size-4 text-slate-500" />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg hover:bg-rose-50 transition-colors" title="Delete">
                                                        <Trash2 className="size-4 text-rose-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>

                            {sortedTickets.length === 0 && (
                                <div className="text-center py-12">
                                    <Ticket className="size-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-400">No ticket types found</p>
                                    <button className="mt-3 text-blue-600 text-sm font-semibold hover:text-blue-700">
                                        + Create your first ticket type
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">
                                Showing {sortedTickets.length} of {TICKET_TYPES.length} ticket types
                                {selectedRows.length > 0 && ` (${selectedRows.length} selected)`}
                            </p>

                            <div className="flex gap-2">
                                <button
                                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                                    disabled
                                >
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                                    1
                                </button>
                                <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
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
                        trendUp,
                    }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
}) {
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
                    trendUp
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                }`}>
                    <TrendingUp className={`size-3 ${!trendUp && "rotate-180"}`} />
                    {trend}
                </span>
            </div>
        </div>
    );
}
