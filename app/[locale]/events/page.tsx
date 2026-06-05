"use client";

import { useState } from "react";
import {
    CalendarDays,
    Download,
    Eye,
    FileText,
    Info,
    ListFilter,
    Pencil,
    Plus,
    Search,
    SortAsc,
    Trash2,
    TrendingUp,
    Upload,
    X,
    AlertCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSidebar } from "@/contexts/SidebarContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// Mock Data
const EVENTS = [
    { id: "1", name: "Cultural Fusion Fest 2025", date: "Mar 15, 2024, 3 PM", status: "published", ticketsSold: 456, revenue: 1697, location: "Kinshasa Arena", capacity: 1000 },
    { id: "2", name: "Creative Convergence 2025", date: "Oct 5, 2023, 11 AM", status: "published", ticketsSold: 789, revenue: 2745, location: "Convention Center", capacity: 1500 },
    { id: "3", name: "Imagination Expo 2025", date: "Dec 1, 2024, 8 AM", status: "published", ticketsSold: 321, revenue: 8361, location: "Expo Hall", capacity: 800 },
    { id: "4", name: "Visionary Vibes 2025", date: "Apr 30, 2025, 2 PM", status: "published", ticketsSold: 876, revenue: 4823, location: "Open Air Theatre", capacity: 1200 },
    { id: "5", name: "Artistry Unleashed 2025", date: "Sep 9, 2023, 4 PM", status: "published", ticketsSold: 654, revenue: 5647, location: "Art Gallery", capacity: 600 },
    { id: "6", name: "Elysium Festival 2025", date: "Feb 14, 2025, 5 PM", status: "published", ticketsSold: 987, revenue: 4029, location: "Beach Arena", capacity: 2000 },
    { id: "7", name: "Spectrum Showcase 2025", date: "Jan 22, 2026, 9 PM", status: "cancelled", ticketsSold: 234, revenue: 7184, location: "Stadium", capacity: 3000 },
    { id: "8", name: "Innovators' Gala 2025", date: "Nov 25, 2026, 10 AM", status: "draft", ticketsSold: 210, revenue: 8910, location: "Grand Hotel", capacity: 500 },
    { id: "9", name: "Artistic Odyssey 2025", date: "Jul 12, 2023, 6 PM", status: "draft", ticketsSold: 543, revenue: 2350, location: "Cultural Center", capacity: 700 },
];

export default function EventsPage() {
    const t = useTranslations("eventsAdmin");
    const { isCollapsed } = useSidebar();

    const [createOpen, setCreateOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<"name" | "date" | "ticketsSold">("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    // Filter events
    const filteredEvents = EVENTS.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || event.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Sort events
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (sortBy === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === "date") {
            return sortOrder === "asc"
                ? new Date(a.date).getTime() - new Date(b.date).getTime()
                : new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
            return sortOrder === "asc" ? a.ticketsSold - b.ticketsSold : b.ticketsSold - a.ticketsSold;
        }
    });

    // Statistics
    const publishedEvents = EVENTS.filter(e => e.status === "published").length;
    const draftEvents = EVENTS.filter(e => e.status === "draft").length;
    const cancelledEvents = EVENTS.filter(e => e.status === "cancelled").length;
    const totalRevenue = EVENTS.reduce((sum, e) => sum + e.revenue, 0);
    const totalTicketsSold = EVENTS.reduce((sum, e) => sum + e.ticketsSold, 0);

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedRows.length === sortedEvents.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(sortedEvents.map(e => e.id));
        }
    };

    const handleEdit = (event: any) => {
        setSelectedEvent(event);
        setUpdateOpen(true);
    };

    const getStatusColor = (status: string) => {
        const colors = {
            published: "bg-emerald-50 text-emerald-600 border-emerald-200",
            draft: "bg-sky-50 text-sky-600 border-sky-200",
            cancelled: "bg-rose-50 text-rose-600 border-rose-200",
        };
        return colors[status as keyof typeof colors] || colors.draft;
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
                                {t("title")}
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                {t("breadcrumbManagement")} / <span className="text-slate-900 font-medium">{t("breadcrumbEvents")}</span>
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                                <Download className="size-4" />
                                Export
                            </button>
                            <button
                                onClick={() => setCreateOpen(true)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all hover:shadow-md"
                            >
                                <Plus className="size-4" />
                                {t("createEvent")}
                            </button>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        <MetricCard
                            title={t("metrics.published")}
                            value={publishedEvents.toString()}
                            trend="+3"
                            trendUp={true}
                            icon={<CalendarDays className="size-5" />}
                        />
                        <MetricCard
                            title={t("metrics.draft")}
                            value={draftEvents.toString()}
                            trend="-1"
                            trendUp={false}
                            icon={<FileText className="size-5" />}
                        />
                        <MetricCard
                            title={t("metrics.rejected")}
                            value={cancelledEvents.toString()}
                            trend="0"
                            trendUp={false}
                            icon={<AlertCircle className="size-5" />}
                        />
                        <MetricCard
                            title="Total Revenue"
                            value={`$${(totalRevenue / 1000).toFixed(1)}K`}
                            trend="+15.2%"
                            trendUp={true}
                            icon={<TrendingUp className="size-5" />}
                        />
                    </div>

                    {/* Events Table */}
                    <div className="bg-white rounded border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                        <div className="p-5 border-b border-slate-100">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <h2 className="text-lg font-bold text-slate-900">
                                    {t("tableTitle")} ({sortedEvents.length})
                                </h2>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    {/* Search */}
                                    <div className="flex h-10 w-full items-center gap-2 rounded border border-slate-200 px-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 sm:w-64">
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
                                        className="h-10 px-3 rounded border border-slate-200 text-sm font-medium text-slate-600 outline-none focus:border-blue-400"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>

                                    {/* Sort Button */}
                                    <button
                                        onClick={() => {
                                            const nextSort: ("name" | "date" | "ticketsSold")[] = ["date", "name", "ticketsSold"];
                                            const currentIndex = nextSort.indexOf(sortBy);
                                            const nextSortBy = nextSort[(currentIndex + 1) % nextSort.length];
                                            if (nextSortBy === sortBy) {
                                                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                            } else {
                                                setSortBy(nextSortBy);
                                                setSortOrder("asc");
                                            }
                                        }}
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded border border-slate-200 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
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
                                            checked={selectedRows.length === sortedEvents.length && sortedEvents.length > 0}
                                            onChange={toggleAll}
                                            className="rounded border-slate-300"
                                        />
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.eventName")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.dateTime")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Capacity</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.ticketsSold")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.revenue")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.status")}</th>
                                    <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.actions")}</th>
                                </tr>
                                </thead>

                                <tbody>
                                {sortedEvents.map((event, index) => {
                                    const soldPercentage = (event.ticketsSold / event.capacity) * 100;

                                    return (
                                        <tr key={event.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                                            <td className="px-5 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(event.id)}
                                                    onChange={() => toggleRow(event.id)}
                                                    className="rounded border-slate-300"
                                                />
                                            </td>
                                            <td className="px-5 py-4 text-sm font-semibold text-slate-500">{index + 1}</td>
                                            <td className="px-5 py-4">
                                                <p className="font-semibold text-slate-900">{event.name}</p>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-slate-500">{event.location}</td>
                                            <td className="px-5 py-4 text-sm text-slate-500">{event.date}</td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-slate-600">{event.capacity}</span>
                                                    <div className="flex-1 max-w-16">
                                                        <div className="w-full bg-slate-100 rounded h-1.5">
                                                            <div
                                                                className="bg-blue-500 h-1.5 rounded"
                                                                style={{ width: `${soldPercentage}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 font-semibold text-slate-700">{event.ticketsSold.toLocaleString()}</td>
                                            <td className="px-5 py-4 font-semibold text-emerald-600">${event.revenue.toLocaleString()}</td>
                                            <td className="px-5 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded text-xs font-semibold border ${getStatusColor(event.status)}`}>
                            {t(`status.${event.status}`)}
                          </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 rounded hover:bg-slate-100 transition-colors" title="View">
                                                        <Eye className="size-4 text-slate-500" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(event)}
                                                        className="p-1.5 rounded hover:bg-sky-50 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="size-4 text-sky-500" />
                                                    </button>
                                                    <button className="p-1.5 rounded hover:bg-rose-50 transition-colors" title="Delete">
                                                        <Trash2 className="size-4 text-rose-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>

                            {sortedEvents.length === 0 && (
                                <div className="text-center py-12">
                                    <CalendarDays className="size-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-400">No events found</p>
                                    <button
                                        onClick={() => setCreateOpen(true)}
                                        className="mt-3 text-blue-600 text-sm font-semibold hover:text-blue-700"
                                    >
                                        + Create your first event
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">
                                Showing {sortedEvents.length} of {EVENTS.length} events
                                {selectedRows.length > 0 && ` (${selectedRows.length} selected)`}
                            </p>

                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                                    1
                                </button>
                                <button className="px-3 py-1.5 rounded border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                                    2
                                </button>
                                <button className="px-3 py-1.5 rounded border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modals */}
            {createOpen && (
                <CreateEventModal t={t} onClose={() => setCreateOpen(false)} />
            )}

            {updateOpen && selectedEvent && (
                <UpdateEventModal t={t} event={selectedEvent} onClose={() => {
                    setUpdateOpen(false);
                    setSelectedEvent(null);
                }} />
            )}
        </div>
    );
}

// ==================== Metric Card Component ====================
function MetricCard({
                        title,
                        value,
                        trend,
                        trendUp,
                        icon
                    }: {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: React.ReactNode;
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
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
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

// ==================== Create Event Modal ====================
function CreateEventModal({ t, onClose }: { t: any; onClose: () => void }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        capacity: "",
        price: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form data:", formData);
        onClose();
    };

    return (
        <ModalShell onClose={onClose} title={t("create.title")}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <Field label={t("form.thumbnail")} required>
                        <div className="flex h-32 items-center justify-center rounded border-2 border-dashed border-slate-200 bg-slate-50 text-sm font-semibold text-slate-400 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                            <Upload className="mr-2 size-4" />
                            {t("form.drop")}{" "}
                            <span className="ml-1 text-blue-600">{t("form.browse")}</span>
                        </div>
                    </Field>

                    <Field label={t("form.title")} required>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="Enter event title"
                        />
                    </Field>

                    <Field label={t("form.description")} required>
            <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="min-h-36 w-full resize-none rounded border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter event description"
            />
                    </Field>

                    <Field label={t("form.location")} required>
                        <Input
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            placeholder="Enter event location"
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label={t("form.date")} required>
                            <Input
                                type="datetime-local"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />
                        </Field>

                        <Field label="Capacity" required>
                            <Input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                                placeholder="Max attendees"
                            />
                        </Field>
                    </div>

                    <Field label="Ticket Price" required>
                        <Input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            placeholder="Price per ticket"
                        />
                    </Field>
                </div>

                <ModalActions onClose={onClose} primaryLabel={t("create.submit")} />
            </form>
        </ModalShell>
    );
}

// ==================== Update Event Modal ====================
function UpdateEventModal({ t, event, onClose }: { t: any; event: any; onClose: () => void }) {
    const [formData, setFormData] = useState({
        title: event.name,
        description: "Event description here",
        location: event.location,
        date: event.date,
        capacity: String(event.capacity),
        price: String(event.revenue / event.ticketsSold),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Update form data:", formData);
        onClose();
    };

    return (
        <ModalShell onClose={onClose} title={t("update.title")}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <Field label={t("form.thumbnail")} required>
                        <div className="relative h-32 overflow-hidden rounded bg-gradient-to-r from-blue-600 to-purple-600">
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <div className="text-center">
                                    <Upload className="size-6 mx-auto mb-2" />
                                    <p className="text-sm">event-thumbnail.jpg</p>
                                    <p className="text-xs opacity-80">2.1 MB</p>
                                </div>
                            </div>
                        </div>
                    </Field>

                    <Field label={t("form.title")} required>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </Field>

                    <Field label={t("form.description")} required>
            <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="min-h-32 w-full resize-none rounded border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
                    </Field>

                    <Field label={t("form.location")} required>
                        <Input
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label={t("form.date")} required>
                            <Input
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />
                        </Field>

                        <Field label="Capacity" required>
                            <Input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                            />
                        </Field>
                    </div>

                    <Field label="Ticket Price" required>
                        <Input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                        />
                    </Field>
                </div>

                <ModalActions onClose={onClose} primaryLabel={t("update.submit")} />
            </form>
        </ModalShell>
    );
}

// ==================== Modal Components ====================
function ModalShell({
                        children,
                        onClose,
                        title,
                    }: {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 p-4">
            <div className="h-full w-full max-w-2xl overflow-y-auto rounded bg-white shadow-2xl animate-in slide-in-from-right duration-300">
                <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-slate-950">{title}</h2>
                    <button
                        onClick={onClose}
                        className="flex size-9 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

function ModalActions({
                          onClose,
                          primaryLabel,
                      }: {
    onClose: () => void;
    primaryLabel: string;
}) {
    return (
        <div className="mt-8 flex justify-end gap-3">
            <button
                type="button"
                onClick={onClose}
                className="h-11 rounded border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
                Cancel
            </button>

            <button
                type="submit"
                className="h-11 rounded bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
                {primaryLabel}
            </button>
        </div>
    );
}

function Field({
                   label,
                   required,
                   children,
               }: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="h-11 w-full rounded border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-slate-300"
        />
    );
}
