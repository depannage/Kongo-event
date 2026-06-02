import type { ChartOptions } from "chart.js";

export const REVENUE_LINE_DATA = {
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

export const REVENUE_LINE_OPTIONS: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top",
            align: "end",
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
                label: (context) =>
                    `${context.dataset.label}: $${(Number(context.raw) / 1000).toFixed(1)}K`,
            },
        },
    },
    scales: {
        x: {
            grid: {
                color: "#eef2f7",
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
                callback: (value) => `$${Number(value) / 1000}K`,
                font: { size: 11 },
            },
        },
    },
};
