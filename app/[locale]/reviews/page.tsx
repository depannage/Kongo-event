"use client";

import { useState } from "react";
import {
    Download,
    Eye,
    EyeOff,
    Info,
    ListFilter,
    MessageCircle,
    Search,
    SortAsc,
    Star,
    ThumbsDown,
    ThumbsUp,
    TrendingUp,
    X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSidebar } from "@/contexts/SidebarContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// Mock Data - Review texts shortened
const REVIEWS = [
    { id: "1", attendeeName: "Emma Brown", eventName: "Indie Fest 2025", rating: 5, reviewText: "Superb music, amazing crowd!", date: "May 10, 2025", visibility: "public", helpful: 45 },
    { id: "2", attendeeName: "Liam Johnson", eventName: "Indie Fest 2025", rating: 5, reviewText: "Fantastic show, great energy!", date: "May 10, 2025", visibility: "public", helpful: 32 },
    { id: "3", attendeeName: "Noah Davis", eventName: "Indie Fest 2025", rating: 4, reviewText: "Unforgettable night, great fun!", date: "May 10, 2025", visibility: "public", helpful: 28 },
    { id: "4", attendeeName: "Sophia Rodriguez", eventName: "Indie Fest 2025", rating: 5, reviewText: "Awesome beats, fantastic time!", date: "May 10, 2025", visibility: "public", helpful: 56 },
    { id: "5", attendeeName: "Olivia Wilson", eventName: "Indie Fest 2025", rating: 4, reviewText: "Incredible show, loved it!", date: "May 10, 2025", visibility: "public", helpful: 23 },
    { id: "6", attendeeName: "Isabella Taylor", eventName: "Indie Fest 2025", rating: 5, reviewText: "Vibrant atmosphere, pure joy!", date: "May 10, 2025", visibility: "public", helpful: 67 },
    { id: "7", attendeeName: "Ava Martinez", eventName: "Indie Fest 2025", rating: 4, reviewText: "Incredible night, loved it!", date: "May 10, 2025", visibility: "public", helpful: 19 },
    { id: "8", attendeeName: "Mason Lee", eventName: "Indie Fest 2025", rating: 4, reviewText: "Awesome tunes, good vibes!", date: "May 10, 2025", visibility: "public", helpful: 31 },
    { id: "9", attendeeName: "Ethan Garcia", eventName: "Indie Fest 2025", rating: 3, reviewText: "Good event but some delays.", date: "May 10, 2025", visibility: "hidden", helpful: 12 },
];

export default function ReviewsPage() {
    const t = useTranslations("reviewsAdmin");
    const { isCollapsed } = useSidebar();

    const [searchTerm, setSearchTerm] = useState("");
    const [filterRating, setFilterRating] = useState("all");
    const [filterVisibility, setFilterVisibility] = useState("all");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<"rating" | "date" | "helpful">("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [viewModal, setViewModal] = useState<any>(null);

    // Filter reviews
    const filteredReviews = REVIEWS.filter(review => {
        const matchesSearch = review.attendeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.reviewText.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.eventName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = filterRating === "all" || review.rating === parseInt(filterRating);
        const matchesVisibility = filterVisibility === "all" || review.visibility === filterVisibility;
        return matchesSearch && matchesRating && matchesVisibility;
    });

    // Sort reviews
    const sortedReviews = [...filteredReviews].sort((a, b) => {
        if (sortBy === "rating") {
            return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
        } else if (sortBy === "helpful") {
            return sortOrder === "asc" ? a.helpful - b.helpful : b.helpful - a.helpful;
        } else {
            return sortOrder === "asc"
                ? new Date(a.date).getTime() - new Date(b.date).getTime()
                : new Date(b.date).getTime() - new Date(a.date).getTime();
        }
    });

    // Statistics
    const totalReviews = REVIEWS.length;
    const averageRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);
    const positiveReviews = REVIEWS.filter(r => r.rating >= 4).length;
    const negativeReviews = REVIEWS.filter(r => r.rating <= 2).length;
    const neutralReviews = REVIEWS.filter(r => r.rating === 3).length;
    const publicReviews = REVIEWS.filter(r => r.visibility === "public").length;
    const hiddenReviews = REVIEWS.filter(r => r.visibility === "hidden").length;

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedRows.length === sortedReviews.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(sortedReviews.map(r => r.id));
        }
    };

    const getVisibilityColor = (visibility: string) => {
        return visibility === "public"
            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
            : "bg-amber-50 text-amber-600 border-amber-200";
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 4) return "text-emerald-600";
        if (rating === 3) return "text-amber-600";
        return "text-rose-600";
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
                                {t("breadcrumbManagement")} / <span className="text-slate-900 font-medium">{t("title")}</span>
                            </p>
                        </div>

                        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                            <Download className="size-4" />
                            {t("exportCsv")}
                        </button>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                        <MetricCard
                            icon={<Star className="size-5" />}
                            title={t("metrics.averageRating")}
                            value={`${averageRating} / 5`}
                            trend="+0.3"
                            trendUp={true}
                        />
                        <MetricCard
                            icon={<MessageCircle className="size-5" />}
                            title={t("metrics.totalReviews")}
                            value={totalReviews.toString()}
                            trend="+12"
                            trendUp={true}
                        />
                        <MetricCard
                            icon={<ThumbsUp className="size-5" />}
                            title={t("metrics.positiveReviews")}
                            value={positiveReviews.toString()}
                            trend="+8"
                            trendUp={true}
                        />
                        <MetricCard
                            icon={<ThumbsDown className="size-5" />}
                            title={t("metrics.negativeReviews")}
                            value={negativeReviews.toString()}
                            trend="-2"
                            trendUp={false}
                        />
                    </div>

                    {/* Rating Distribution */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                        <div className="bg-white rounded border border-slate-200 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-500">Positive (4-5★)</span>
                                <span className="text-2xl font-bold text-emerald-600">{positiveReviews}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded h-2">
                                <div className="bg-emerald-500 h-2 rounded" style={{ width: `${(positiveReviews / totalReviews) * 100}%` }} />
                            </div>
                        </div>
                        <div className="bg-white rounded border border-slate-200 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-500">Neutral (3★)</span>
                                <span className="text-2xl font-bold text-amber-600">{neutralReviews}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded h-2">
                                <div className="bg-amber-500 h-2 rounded" style={{ width: `${(neutralReviews / totalReviews) * 100}%` }} />
                            </div>
                        </div>
                        <div className="bg-white rounded border border-slate-200 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-500">Negative (1-2★)</span>
                                <span className="text-2xl font-bold text-rose-600">{negativeReviews}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded h-2">
                                <div className="bg-rose-500 h-2 rounded" style={{ width: `${(negativeReviews / totalReviews) * 100}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Reviews Table */}
                    <div className="bg-white rounded border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                        <div className="p-5 border-b border-slate-100">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <h2 className="text-lg font-bold text-slate-900">
                                    {t("tableTitle")} ({sortedReviews.length})
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

                                    {/* Filter by Rating */}
                                    <select
                                        value={filterRating}
                                        onChange={(e) => setFilterRating(e.target.value)}
                                        className="h-10 px-3 rounded border border-slate-200 text-sm font-medium text-slate-600 outline-none focus:border-blue-400"
                                    >
                                        <option value="all">All Ratings</option>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>

                                    {/* Filter by Visibility */}
                                    <select
                                        value={filterVisibility}
                                        onChange={(e) => setFilterVisibility(e.target.value)}
                                        className="h-10 px-3 rounded border border-slate-200 text-sm font-medium text-slate-600 outline-none focus:border-blue-400"
                                    >
                                        <option value="all">All Visibility</option>
                                        <option value="public">Public</option>
                                        <option value="hidden">Hidden</option>
                                    </select>

                                    {/* Sort Button */}
                                    <button
                                        onClick={() => {
                                            const nextSort: ("rating" | "date" | "helpful")[] = ["date", "rating", "helpful"];
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
                            <table className="w-full min-w-[1200px]">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="w-12 px-5 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === sortedReviews.length && sortedReviews.length > 0}
                                            onChange={toggleAll}
                                            className="rounded border-slate-300"
                                        />
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.attendeeName")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.eventName")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.rating")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.reviewText")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.date")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Helpful</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.visibility")}</th>
                                    <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                {sortedReviews.map((review, index) => (
                                    <tr key={review.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                                        <td className="px-5 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(review.id)}
                                                onChange={() => toggleRow(review.id)}
                                                className="rounded border-slate-300"
                                            />
                                        </td>
                                        <td className="px-5 py-4 text-sm font-semibold text-slate-500">{index + 1}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                                                    {review.attendeeName.charAt(0)}
                                                </div>
                                                <p className="font-semibold text-slate-900">{review.attendeeName}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-600">{review.eventName}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1">
                                                <RatingStars value={review.rating} />
                                                <span className={`text-sm font-semibold ml-1 ${getRatingColor(review.rating)}`}>
                                                        {review.rating}/5
                                                    </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="max-w-xs truncate text-sm text-slate-600 cursor-pointer hover:text-blue-600"
                                               onClick={() => setViewModal(review)}>
                                                "{review.reviewText}"
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-500">{review.date}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="size-3 text-slate-400" />
                                                <span className="text-sm font-medium text-slate-600">{review.helpful}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1.5">
                                                {review.visibility === "public" ? (
                                                    <Eye className="size-3 text-emerald-500" />
                                                ) : (
                                                    <EyeOff className="size-3 text-amber-500" />
                                                )}
                                                <span className={`inline-flex px-2.5 py-1 rounded text-xs font-semibold border ${getVisibilityColor(review.visibility)}`}>
                                                        {review.visibility === "public" ? t("public") : t("hidden")}
                                                    </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => setViewModal(review)}
                                                    className="p-1.5 rounded hover:bg-slate-100 transition-colors"
                                                    title="View"
                                                >
                                                    <Eye className="size-4 text-slate-500" />
                                                </button>
                                                <button className="p-1.5 rounded hover:bg-amber-50 transition-colors" title="Toggle Visibility">
                                                    {review.visibility === "public" ? (
                                                        <EyeOff className="size-4 text-amber-500" />
                                                    ) : (
                                                        <Eye className="size-4 text-emerald-500" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {sortedReviews.length === 0 && (
                                <div className="text-center py-12">
                                    <MessageCircle className="size-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-400">No reviews found</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">
                                Showing {sortedReviews.length} of {REVIEWS.length} reviews
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

            {/* Review Detail Modal */}
            {viewModal && (
                <ReviewModal review={viewModal} t={t} onClose={() => setViewModal(null)} />
            )}
        </div>
    );
}

// ==================== Metric Card Component ====================
function MetricCard({
                        icon,
                        title,
                        value,
                        trend,
                        trendUp
                    }: {
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

// ==================== Rating Stars Component ====================
function RatingStars({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`size-4 ${
                        star <= value
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                    }`}
                />
            ))}
        </div>
    );
}

// ==================== Review Modal Component ====================
function ReviewModal({ review, t, onClose }: { review: any; t: any; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded bg-white shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-slate-950">Review Details</h2>
                    <button
                        onClick={onClose}
                        className="flex size-9 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                                {review.attendeeName.charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">{review.attendeeName}</p>
                                <p className="text-xs text-slate-500">{review.date}</p>
                            </div>
                        </div>
                        <RatingStars value={review.rating} />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Event</p>
                        <p className="text-slate-900 font-semibold">{review.eventName}</p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Review</p>
                        <p className="text-slate-700 leading-relaxed">"{review.reviewText}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                            <ThumbsUp className="size-4 text-slate-400" />
                            <span className="text-sm text-slate-600">{review.helpful} people found this helpful</span>
                        </div>
                        <span className={`inline-flex px-2.5 py-1 rounded text-xs font-semibold border ${
                            review.visibility === "public"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                : "bg-amber-50 text-amber-600 border-amber-200"
                        }`}>
                            {review.visibility === "public" ? "Public" : "Hidden"}
                        </span>
                    </div>
                </div>

                <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        Close
                    </button>
                    <button className="px-4 py-2 rounded bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                        {review.visibility === "public" ? "Hide Review" : "Publish Review"}
                    </button>
                </div>
            </div>
        </div>
    );
}
