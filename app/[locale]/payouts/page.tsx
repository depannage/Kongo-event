"use client";

import { useState } from "react";
import {
    CircleDollarSign,
    Download,
    Edit,
    Eye,
    Info,
    Link2,
    ListFilter,
    Plus,
    Search,
    SortAsc,
    Tag,
    TrendingUp,
    Trash2,
    X,
    Copy,
    CheckCircle,
    Clock,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSidebar } from "@/contexts/SidebarContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// Mock Data
const PROMOTIONS = [
    { id: "1", code: "EARLYBIRD", discount: "20% OFF", type: "percentage", usageLimit: "Unlimited", used: 230, expiryDate: "Dec 31, 2025", status: "active", createdAt: "Jan 15, 2025" },
    { id: "2", code: "SUMMER25", discount: "25% OFF", type: "percentage", usageLimit: "120", used: 95, expiryDate: "Aug 31, 2025", status: "active", createdAt: "Feb 10, 2025" },
    { id: "3", code: "VIPACCESS", discount: "15% OFF", type: "percentage", usageLimit: "80", used: 42, expiryDate: "Dec 31, 2025", status: "active", createdAt: "Mar 5, 2025" },
    { id: "4", code: "WELCOME10", discount: "10% OFF", type: "percentage", usageLimit: "Unlimited", used: 310, expiryDate: "Dec 31, 2025", status: "active", createdAt: "Jan 20, 2025" },
    { id: "5", code: "GROUP5", discount: "5% OFF", type: "percentage", usageLimit: "200", used: 118, expiryDate: "Nov 30, 2025", status: "active", createdAt: "Apr 12, 2025" },
    { id: "6", code: "FLASH30", discount: "30% OFF", type: "percentage", usageLimit: "50", used: 50, expiryDate: "May 15, 2025", status: "expired", createdAt: "May 1, 2025" },
    { id: "7", code: "KONGO20", discount: "$20 OFF", type: "fixed", usageLimit: "150", used: 74, expiryDate: "Dec 31, 2025", status: "active", createdAt: "Jun 8, 2025" },
    { id: "8", code: "FESTIVAL15", discount: "15% OFF", type: "percentage", usageLimit: "100", used: 61, expiryDate: "Oct 31, 2025", status: "active", createdAt: "Jul 15, 2025" },
    { id: "9", code: "OLDPROMO", discount: "10% OFF", type: "percentage", usageLimit: "90", used: 90, expiryDate: "Jan 31, 2025", status: "expired", createdAt: "Dec 1, 2024" },
];

export default function PromotionsPage() {
    const t = useTranslations("promotionsAdmin");
    const { isCollapsed } = useSidebar();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<"code" | "used" | "expiryDate">("code");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // Filter promotions
    const filteredPromotions = PROMOTIONS.filter(promo => {
        const matchesSearch = promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            promo.discount.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || promo.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Sort promotions
    const sortedPromotions = [...filteredPromotions].sort((a, b) => {
        if (sortBy === "code") {
            return sortOrder === "asc" ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code);
        } else if (sortBy === "used") {
            return sortOrder === "asc" ? a.used - b.used : b.used - a.used;
        } else {
            return sortOrder === "asc"
                ? new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
                : new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime();
        }
    });

    // Statistics
    const activePromotions = PROMOTIONS.filter(p => p.status === "active").length;
    const expiredPromotions = PROMOTIONS.filter(p => p.status === "expired").length;
    const totalUsed = PROMOTIONS.reduce((sum, p) => sum + p.used, 0);
    const salesFromPromotions = totalUsed * 25; // Mock calculation

    const toggleRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedRows.length === sortedPromotions.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(sortedPromotions.map(p => p.id));
        }
    };

    const handleEdit = (promotion: any) => {
        setSelectedPromotion(promotion);
        setModalOpen(true);
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const getStatusColor = (status: string) => {
        return status === "active"
            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
            : "bg-rose-50 text-rose-600 border-rose-200";
    };

    const getUsagePercentage = (used: number, limit: string) => {
        if (limit === "Unlimited") return 0;
        const limitNum = parseInt(limit);
        return (used / limitNum) * 100;
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

                        <div className="flex gap-3">
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                                <Download className="size-4" />
                                Export
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedPromotion(null);
                                    setModalOpen(true);
                                }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all hover:shadow-md"
                            >
                                <Plus className="size-4" />
                                {t("addPromotion")}
                            </button>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                        <MetricCard
                            icon={<Tag className="size-5" />}
                            title={t("metrics.discountCodes")}
                            value={PROMOTIONS.length.toString()}
                            trend="+3"
                            trendUp={true}
                        />
                        <MetricCard
                            icon={<Link2 className="size-5" />}
                            title={t("metrics.referralLinks")}
                            value="11"
                            trend="+2"
                            trendUp={true}
                        />
                        <MetricCard
                            icon={<CircleDollarSign className="size-5" />}
                            title={t("metrics.salesFromPromotions")}
                            value={`$${(salesFromPromotions / 1000).toFixed(1)}K`}
                            trend="+15.2%"
                            trendUp={true}
                        />
                    </div>

                    {/* Status Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-emerald-600 mb-1">Active Promotions</p>
                                    <p className="text-2xl font-bold text-emerald-700">{activePromotions}</p>
                                </div>
                                <CheckCircle className="size-8 text-emerald-500" />
                            </div>
                        </div>
                        <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-rose-600 mb-1">Expired Promotions</p>
                                    <p className="text-2xl font-bold text-rose-700">{expiredPromotions}</p>
                                </div>
                                <Clock className="size-8 text-rose-500" />
                            </div>
                        </div>
                    </div>

                    {/* Promotions Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                        <div className="p-5 border-b border-slate-100">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <h2 className="text-lg font-bold text-slate-900">
                                    {t("tableTitle")} ({sortedPromotions.length})
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
                                        <option value="expired">Expired</option>
                                    </select>

                                    {/* Sort Button */}
                                    <button
                                        onClick={() => {
                                            const nextSort: ("code" | "used" | "expiryDate")[] = ["code", "used", "expiryDate"];
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
                                            checked={selectedRows.length === sortedPromotions.length && sortedPromotions.length > 0}
                                            onChange={toggleAll}
                                            className="rounded border-slate-300"
                                        />
                                    </th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.code")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.discount")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.used")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Usage Limit</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.expiryDate")}</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.status")}</th>
                                    <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("table.actions")}</th>
                                </tr>
                                </thead>

                                <tbody>
                                {sortedPromotions.map((promo, index) => {
                                    const usagePercentage = getUsagePercentage(promo.used, promo.usageLimit);

                                    return (
                                        <tr key={promo.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                                            <td className="px-5 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(promo.id)}
                                                    onChange={() => toggleRow(promo.id)}
                                                    className="rounded border-slate-300"
                                                />
                                            </td>
                                            <td className="px-5 py-4 text-sm font-semibold text-slate-500">{index + 1}</td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono font-bold text-slate-900">{promo.code}</span>
                                                    <button
                                                        onClick={() => handleCopyCode(promo.code)}
                                                        className="p-1 rounded-md hover:bg-slate-100 transition-colors"
                                                        title="Copy code"
                                                    >
                                                        {copiedCode === promo.code ? (
                                                            <CheckCircle className="size-3.5 text-emerald-500" />
                                                        ) : (
                                                            <Copy className="size-3.5 text-slate-400" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 font-semibold text-slate-900">{promo.discount}</td>
                                            <td className="px-5 py-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                              promo.type === "percentage"
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-purple-50 text-purple-600"
                          }`}>
                            {promo.type === "percentage" ? "Percentage" : "Fixed Amount"}
                          </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-600">{promo.used}</span>
                                                        <span className="text-xs text-slate-400">
                                {promo.usageLimit !== "Unlimited" ? `/ ${promo.usageLimit}` : ""}
                              </span>
                                                    </div>
                                                    {promo.usageLimit !== "Unlimited" && (
                                                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                                                            <div
                                                                className="bg-blue-500 h-1.5 rounded-full"
                                                                style={{ width: `${usagePercentage}%` }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-slate-500">
                                                {promo.usageLimit === "Unlimited" ? "∞ Unlimited" : promo.usageLimit}
                                            </td>
                                            <td className="px-5 py-4 text-sm text-slate-500">{promo.expiryDate}</td>
                                            <td className="px-5 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(promo.status)}`}>
                            {promo.status === "active" ? t("active") : t("expired")}
                          </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="View">
                                                        <Eye className="size-4 text-slate-500" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(promo)}
                                                        className="p-1.5 rounded-lg hover:bg-sky-50 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="size-4 text-sky-500" />
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

                            {sortedPromotions.length === 0 && (
                                <div className="text-center py-12">
                                    <Tag className="size-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-400">No promotions found</p>
                                    <button
                                        onClick={() => setModalOpen(true)}
                                        className="mt-3 text-blue-600 text-sm font-semibold hover:text-blue-700"
                                    >
                                        + Create your first promotion
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">
                                Showing {sortedPromotions.length} of {PROMOTIONS.length} promotions
                                {selectedRows.length > 0 && ` (${selectedRows.length} selected)`}
                            </p>

                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                                    1
                                </button>
                                <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                                    2
                                </button>
                                <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Promotion Modal */}
            {modalOpen && (
                <PromotionModal
                    t={t}
                    promotion={selectedPromotion}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedPromotion(null);
                    }}
                />
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

// ==================== Promotion Modal ====================
function PromotionModal({ t, promotion, onClose }: { t: any; promotion?: any; onClose: () => void }) {
    const [formData, setFormData] = useState({
        code: promotion?.code || "",
        discount: promotion?.discount || "",
        type: promotion?.type || "percentage",
        usageLimit: promotion?.usageLimit || "",
        expiryDate: promotion?.expiryDate || "",
        status: promotion?.status || "active",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Save promotion:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-slate-950">
                        {promotion ? "Edit Promotion" : t("addPromotion")}
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
                            Promo Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.code}
                            onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-mono outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="e.g., SUMMER25"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Discount Type
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount ($)</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Discount Value <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.discount}
                                onChange={(e) => setFormData({...formData, discount: e.target.value})}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder={formData.type === "percentage" ? "e.g., 20%" : "e.g., $10"}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Usage Limit
                            </label>
                            <input
                                type="text"
                                value={formData.usageLimit}
                                onChange={(e) => setFormData({...formData, usageLimit: e.target.value})}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Unlimited or number"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Expiry Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                required
                            />
                        </div>
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
                            <option value="active">Active</option>
                            <option value="expired">Expired</option>
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
                            {promotion ? "Update Promotion" : "Create Promotion"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
