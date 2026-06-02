"use client";

import { RefreshCcw, TrendingDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { registerReportCharts } from "@/components/report/chart/register-chart";
import { REVENUE_LINE_DATA, REVENUE_LINE_OPTIONS } from "@/components/report/chart/revenue-chart.config";

const PERIODS = ["day", "week", "month", "year"] as const;

registerReportCharts();

export function RevenueAnalytics() {
    const t = useTranslations("reports");
    const [selectedPeriod, setSelectedPeriod] = useState<string>("month");

    return (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg">
            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-slate-900">{t("revenueAnalytics")}</h2>

                <div className="flex items-center gap-3">
                    <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
                        {PERIODS.map((period) => (
                            <button
                                key={period}
                                type="button"
                                onClick={() => setSelectedPeriod(period)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                    selectedPeriod === period
                                        ? "bg-white text-slate-900 shadow-sm"
                                        : "text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                {t(period)}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        title={t("revenueAnalytics")}
                        className="flex size-9 items-center justify-center rounded-xl border border-slate-200 transition-colors hover:bg-slate-50"
                    >
                        <RefreshCcw className="size-4 text-slate-400" />
                    </button>
                </div>
            </div>

            <div className="px-5 pt-5">
                <div className="flex flex-wrap items-end gap-3">
                    <div>
                        <p className="text-3xl font-bold text-slate-900">$1,302.00</p>
                        <p className="mt-1 text-xs text-slate-500">Total revenue this period</p>
                    </div>
                    <div className="flex items-center gap-2 pb-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600">
                            <TrendingDown className="size-3" />
                            8.5%
                        </span>
                        <span className="text-xs text-slate-400">{t("fromLastPeriod")}</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px] px-4 pb-5 pt-5 sm:px-5">
                <Line data={REVENUE_LINE_DATA} options={REVENUE_LINE_OPTIONS} />
            </div>
        </div>
    );
}
