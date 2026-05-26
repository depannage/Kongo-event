"use client";

import { useState } from "react";
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    Plus,
    X,
    Edit,
    Trash2,
    AlertCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSidebar } from "@/contexts/SidebarContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// Mock Data
const WEEK_DAYS = [
    { day: "Mon", date: 19, fullDate: "2025-05-19" },
    { day: "Tue", date: 20, fullDate: "2025-05-20" },
    { day: "Wed", date: 21, fullDate: "2025-05-21" },
    { day: "Thu", date: 22, fullDate: "2025-05-22" },
    { day: "Fri", date: 23, fullDate: "2025-05-23" },
    { day: "Sat", date: 24, fullDate: "2025-05-24" },
    { day: "Sun", date: 25, fullDate: "2025-05-25" },
];

const EVENTS = [
    {
        id: "1",
        title: "Startup Summit 2025",
        date: "May 22, 2025",
        fullDate: "2025-05-22",
        time: "09:00 AM - 12:00 PM",
        location: "Kinshasa, Gombe",
        status: "upcoming",
        description: "Annual startup summit bringing together entrepreneurs and investors",
    },
    {
        id: "2",
        title: "Indie Music Fest",
        date: "May 24, 2025",
        fullDate: "2025-05-24",
        time: "06:00 PM - 10:00 PM",
        location: "Salle Showbuzz",
        status: "upcoming",
        description: "Live performances by independent artists",
    },
    {
        id: "3",
        title: "Tech Workshop: AI Tools",
        date: "May 25, 2025",
        fullDate: "2025-05-25",
        time: "10:00 AM - 02:00 PM",
        location: "Pullman Kinshasa",
        status: "upcoming",
        description: "Hands-on workshop on AI tools for developers",
    },
    {
        id: "4",
        title: "Food Carnival 2025",
        date: "June 1, 2025",
        fullDate: "2025-06-01",
        time: "01:00 PM - 08:00 PM",
        location: "Limete",
        status: "draft",
        description: "Celebration of local cuisine and culture",
    },
];

const CALENDAR_CELLS = 35; // 5 rows of 7 days

export default function CalendarsPage() {
    const t = useTranslations("calendarAdmin");
    const { isCollapsed } = useSidebar();

    const [currentMonth, setCurrentMonth] = useState("May 2025");
    const [selectedDate, setSelectedDate] = useState<string | null>("2025-05-22");
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);

    // Filter upcoming events
    const upcomingEvents = EVENTS.filter(e => e.status === "upcoming");
    const draftEvents = EVENTS.filter(e => e.status === "draft");

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
    };

    const handleEventClick = (event: any) => {
        setSelectedEvent(event);
        setViewModalOpen(true);
    };

    const getEventsForDate = (date: string) => {
        return EVENTS.filter(event => event.fullDate === date);
    };

    const getStatusColor = (status: string) => {
        return status === "draft"
            ? "border-sky-200 bg-sky-50 text-sky-600"
            : "border-emerald-200 bg-emerald-50 text-emerald-600";
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
                                {t("breadcrumbHome")} / <span className="text-slate-900 font-medium">{t("title")}</span>
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setSelectedEvent(null);
                                setEventModalOpen(true);
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all hover:shadow-md"
                        >
                            <Plus className="size-4" />
                            {t("addEvent")}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                        {/* Calendar Section */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                            {/* Calendar Header */}
                            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-extrabold text-slate-950">
                                        {currentMonth}
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {t("monthDescription")}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="flex size-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                                        <ChevronLeft className="size-4 text-slate-500" />
                                    </button>
                                    <button className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold hover:bg-slate-50 transition-colors">
                                        {t("today")}
                                    </button>
                                    <button className="flex size-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                                        <ChevronRight className="size-4 text-slate-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Calendar Grid */}
                            <div className="overflow-x-auto p-5">
                                <div className="min-w-[800px]">
                                    {/* Week Days Header */}
                                    <div className="grid grid-cols-7 overflow-hidden rounded-t-2xl border border-slate-200">
                                        {WEEK_DAYS.map((item) => (
                                            <div
                                                key={item.day}
                                                className="border-r border-slate-200 bg-slate-50 p-4 text-center last:border-r-0"
                                            >
                                                <p className="text-sm font-semibold text-slate-500">
                                                    {item.day}
                                                </p>
                                                <button
                                                    onClick={() => handleDateClick(item.fullDate)}
                                                    className={`mx-auto mt-3 flex size-10 items-center justify-center rounded-full text-lg font-extrabold transition-all ${
                                                        selectedDate === item.fullDate
                                                            ? "bg-blue-600 text-white shadow-md"
                                                            : "text-slate-900 hover:bg-slate-100"
                                                    }`}
                                                >
                                                    {item.date}
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Calendar Cells */}
                                    <div className="grid grid-cols-7 overflow-hidden rounded-b-2xl border border-t-0 border-slate-200">
                                        {Array.from({ length: CALENDAR_CELLS }).map((_, index) => {
                                            const weekIndex = Math.floor(index / 7);
                                            const dayIndex = index % 7;
                                            const date = WEEK_DAYS[dayIndex];
                                            const cellDate = date ? date.fullDate : null;
                                            const eventsOnDate = cellDate ? getEventsForDate(cellDate) : [];
                                            const isCurrentMonth = index >= 0 && index < 35; // Adjust based on actual month

                                            return (
                                                <div
                                                    key={index}
                                                    className={`min-h-[110px] border-r border-t border-slate-200 p-2 last:border-r-0 ${
                                                        !isCurrentMonth ? "bg-slate-50" : ""
                                                    } hover:bg-slate-50 transition-colors`}
                                                >
                                                    {isCurrentMonth && date && (
                                                        <>
                                                            <button
                                                                onClick={() => handleDateClick(date.fullDate)}
                                                                className={`mb-2 inline-flex size-7 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                                                                    selectedDate === date.fullDate
                                                                        ? "bg-blue-600 text-white"
                                                                        : "text-slate-600 hover:bg-slate-100"
                                                                }`}
                                                            >
                                                                {date.date}
                                                            </button>
                                                            <div className="space-y-1">
                                                                {eventsOnDate.map((event) => (
                                                                    <CalendarEvent
                                                                        key={event.id}
                                                                        title={event.title}
                                                                        variant={event.status === "draft" ? "draft" : "published"}
                                                                        onClick={() => handleEventClick(event)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events Sidebar */}
                        <div className="space-y-6">
                            {/* Upcoming Events */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                                <div className="border-b border-slate-100 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900">
                                                {t("upcomingTitle")}
                                            </h2>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {t("upcomingDescription")}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                        {upcomingEvents.length} upcoming
                      </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="divide-y divide-slate-100">
                                    {upcomingEvents.length > 0 ? (
                                        upcomingEvents.map((event) => (
                                            <EventCard
                                                key={event.id}
                                                event={event}
                                                onView={() => handleEventClick(event)}
                                                t={t}
                                            />
                                        ))
                                    ) : (
                                        <div className="p-8 text-center">
                                            <CalendarDays className="size-12 text-slate-300 mx-auto mb-3" />
                                            <p className="text-slate-400">No upcoming events</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Draft Events */}
                            {draftEvents.length > 0 && (
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                                    <div className="border-b border-slate-100 p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-lg font-bold text-slate-900">
                                                    Draft Events
                                                </h2>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Events waiting to be published
                                                </p>
                                            </div>
                                            <AlertCircle className="size-5 text-amber-500" />
                                        </div>
                                    </div>

                                    <div className="divide-y divide-slate-100">
                                        {draftEvents.map((event) => (
                                            <EventCard
                                                key={event.id}
                                                event={event}
                                                onView={() => handleEventClick(event)}
                                                t={t}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quick Stats */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
                                <h3 className="text-sm font-semibold text-white/80 mb-2">Total Events</h3>
                                <p className="text-3xl font-bold mb-1">{EVENTS.length}</p>
                                <p className="text-sm text-white/70">
                                    {upcomingEvents.length} upcoming • {draftEvents.length} draft
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Event Modal (Create/Edit) */}
            {eventModalOpen && (
                <EventModal
                    t={t}
                    event={selectedEvent}
                    onClose={() => {
                        setEventModalOpen(false);
                        setSelectedEvent(null);
                    }}
                />
            )}

            {/* View Event Modal */}
            {viewModalOpen && selectedEvent && (
                <ViewEventModal
                    t={t}
                    event={selectedEvent}
                    onClose={() => {
                        setViewModalOpen(false);
                        setSelectedEvent(null);
                    }}
                    onEdit={() => {
                        setViewModalOpen(false);
                        setEventModalOpen(true);
                    }}
                />
            )}
        </div>
    );
}

// ==================== Calendar Event Component ====================
function CalendarEvent({
                           title,
                           variant = "published",
                           onClick,
                       }: {
    title: string;
    variant?: "published" | "draft";
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full rounded-lg px-2 py-1.5 text-left text-xs font-semibold transition-all ${
                variant === "draft"
                    ? "bg-sky-50 text-sky-600 hover:bg-sky-100"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
        >
            {title}
        </button>
    );
}

// ==================== Event Card Component ====================
function EventCard({ event, onView, t }: { event: any; onView: () => void; t: any }) {
    const getStatusColor = (status: string) => {
        return status === "draft"
            ? "border-sky-200 bg-sky-50 text-sky-600"
            : "border-emerald-200 bg-emerald-50 text-emerald-600";
    };

    return (
        <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={onView}>
            <div className="border-l-4 border-blue-600 pl-3">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1">
                        {event.title}
                    </h3>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${getStatusColor(event.status)}`}>
            {event.status === "draft" ? t("draft") : t("upcoming")}
          </span>
                </div>

                <div className="space-y-1.5 mt-2">
                    <p className="flex items-center gap-2 text-xs text-slate-500">
                        <CalendarDays className="size-3.5" />
                        {event.date}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="size-3.5" />
                        {event.time}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="size-3.5" />
                        {event.location}
                    </p>
                </div>
            </div>
        </div>
    );
}

// ==================== Event Modal (Create/Edit) ====================
function EventModal({ t, event, onClose }: { t: any; event?: any; onClose: () => void }) {
    const [formData, setFormData] = useState({
        title: event?.title || "",
        date: event?.fullDate || "",
        time: event?.time || "",
        location: event?.location || "",
        description: event?.description || "",
        status: event?.status || "upcoming",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Save event:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-slate-950">
                        {event ? t("editEvent") : t("addEvent")}
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Event Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter event title"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                value={formData.time.split(" - ")[0]}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Location <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter location"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            rows={3}
                            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter event description"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="upcoming">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                        >
                            {event ? "Update Event" : "Create Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ==================== View Event Modal ====================
function ViewEventModal({ t, event, onClose, onEdit }: { t: any; event: any; onClose: () => void; onEdit: () => void }) {
    const getStatusColor = (status: string) => {
        return status === "draft"
            ? "border-sky-200 bg-sky-50 text-sky-600"
            : "border-emerald-200 bg-emerald-50 text-emerald-600";
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-slate-950">{event.title}</h2>
                    <button
                        onClick={onClose}
                        className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
            <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(event.status)}`}>
              {event.status === "draft" ? "Draft" : "Published"}
            </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <CalendarDays className="size-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-slate-500">Date</p>
                                <p className="text-slate-900 font-medium">{event.date}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Clock className="size-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-slate-500">Time</p>
                                <p className="text-slate-900 font-medium">{event.time}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="size-5 text-slate-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-slate-500">Location</p>
                                <p className="text-slate-900 font-medium">{event.location}</p>
                            </div>
                        </div>

                        {event.description && (
                            <div className="pt-2">
                                <p className="text-sm font-medium text-slate-500 mb-1">Description</p>
                                <p className="text-slate-700">{event.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={onEdit}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                    >
                        Edit Event
                    </button>
                </div>
            </div>
        </div>
    );
}
