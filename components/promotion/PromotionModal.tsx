"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Promotion, PromotionStatus, PromotionType } from "@/components/promotion/types";

type PromotionModalProps = {
    promotion?: Promotion | null;
    onClose: () => void;
};

export function PromotionModal({ promotion, onClose }: PromotionModalProps) {
    const t = useTranslations("promotionsAdmin");
    const [formData, setFormData] = useState({
        code: promotion?.code ?? "",
        discount: promotion?.discount ?? "",
        type: promotion?.type ?? "percentage",
        usageLimit: promotion?.usageLimit ?? "",
        expiryDate: promotion?.expiryDate ?? "",
        status: promotion?.status ?? "active",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Save promotion:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="animate-in zoom-in-95 w-full max-w-lg rounded-2xl bg-white shadow-2xl duration-300">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h2 className="text-xl font-extrabold text-slate-950">
                        {promotion ? t("modal.editTitle") : t("addPromotion")}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        title={t("modal.cancel")}
                        className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            {t("modal.code")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.code}
                            onChange={(e) =>
                                setFormData({ ...formData, code: e.target.value.toUpperCase() })
                            }
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder={t("modal.codePlaceholder")}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                {t("modal.discountType")}
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        type: e.target.value as PromotionType,
                                    })
                                }
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="percentage">{t("modal.typePercentage")}</option>
                                <option value="fixed">{t("modal.typeFixed")}</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                {t("modal.discountValue")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.discount}
                                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder={
                                    formData.type === "percentage"
                                        ? t("modal.discountPlaceholderPercent")
                                        : t("modal.discountPlaceholderFixed")
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                {t("modal.usageLimit")}
                            </label>
                            <input
                                type="text"
                                value={formData.usageLimit}
                                onChange={(e) =>
                                    setFormData({ ...formData, usageLimit: e.target.value })
                                }
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder={t("modal.usageLimitPlaceholder")}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                {t("table.expiryDate")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={formData.expiryDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, expiryDate: e.target.value })
                                }
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            {t("table.status")}
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: e.target.value as PromotionStatus,
                                })
                            }
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="active">{t("active")}</option>
                            <option value="expired">{t("expired")}</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            {t("modal.cancel")}
                        </button>
                        <button
                            type="submit"
                            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            {promotion ? t("modal.update") : t("modal.create")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
