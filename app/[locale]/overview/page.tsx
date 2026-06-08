"use client";

import { useEffect, useMemo, useState } from "react";
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
  Loader2,
  RefreshCcw,
  Search,
  Ticket,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Bar } from "react-chartjs-2";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useSidebar } from "@/contexts/SidebarContext";
import { Link } from "@/i18n/navigation";
import { api } from "@/shared/lib/http/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type DashboardEvent = {
  id: string;
  name: string;
  date: string;
  status: string;
  tickets: string;
};

type OverviewData = {
  totalTicketsSold: number;
  totalRevenue: number;
  upcomingEventsCount: number;
  checkinsCompleted: number;
  revenueTrend: string;
  ticketsTrend: string;
  eventsTrend: string;
  checkinsTrend: string;
  analyticsLabels: string[];
  revenueSeries: number[];
  ticketsSeries: number[];
  upcomingEvents: DashboardEvent[];
  recentEvents: DashboardEvent[];
};

const emptyOverview: OverviewData = {
  totalTicketsSold: 0,
  totalRevenue: 0,
  upcomingEventsCount: 0,
  checkinsCompleted: 0,
  revenueTrend: "0%",
  ticketsTrend: "0%",
  eventsTrend: "0",
  checkinsTrend: "0%",
  analyticsLabels: [],
  revenueSeries: [],
  ticketsSeries: [],
  upcomingEvents: [],
  recentEvents: [],
};

const chartOptions = {
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
    tooltip: { backgroundColor: "#0f172a", padding: 12 },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#64748b", font: { size: 12 } } },
    y: { beginAtZero: true, grid: { color: "#e5e7eb" } },
  },
};

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const { isCollapsed } = useSidebar();
  const [from, setFrom] = useState(monthStartKey(new Date()));
  const [to, setTo] = useState(monthEndKey(new Date()));
  const [overview, setOverview] = useState<OverviewData>(emptyOverview);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOverview = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/dashboard/overview", { params: { from, to } });
      setOverview(normalizeOverview(response.data));
    } catch (err: any) {
      setError(err?.response?.data?.message?.[0] ?? err?.response?.data?.message ?? t("loadError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
  }, [from, to]);

  const chartData = useMemo(() => ({
    labels: overview.analyticsLabels.length ? overview.analyticsLabels : [t("noData")],
    datasets: [
      {
        label: t("metrics.totalRevenue"),
        data: overview.revenueSeries.length ? overview.revenueSeries : [0],
        backgroundColor: "rgba(37, 99, 235, 0.16)",
        borderRadius: 4,
        barThickness: 24,
      },
      {
        label: t("metrics.totalTicketsSold"),
        data: overview.ticketsSeries.length ? overview.ticketsSeries : [0],
        backgroundColor: "rgba(37, 99, 235, 1)",
        borderRadius: 4,
        barThickness: 24,
      },
    ],
  }), [overview, t]);

  const filteredRecentEvents = overview.recentEvents.filter((event) => JSON.stringify(event).toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar />

      <div className={`transition-all duration-300 ${isCollapsed ? "lg:ml-[80px]" : "lg:ml-[280px]"}`}>
        <DashboardNavbar />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {t("breadcrumbHome")} / <span className="font-semibold text-slate-900">{t("title")}</span>
              </p>
              <h1 className="mt-1 text-2xl font-extrabold text-slate-950">{t("title")}</h1>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <DateField label={t("from")} value={from} onChange={setFrom} />
              <DateField label={t("to")} value={to} onChange={setTo} />
              <button onClick={loadOverview} className="inline-flex h-10 items-center justify-center gap-2 rounded border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <RefreshCcw className="size-4" />
                {t("refresh")}
              </button>
              <Link href="/events/create" className="inline-flex h-10 items-center justify-center rounded bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700">
                {t("createEvent")}
              </Link>
            </div>
          </div>

          {error && <div className="mb-5 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</div>}

          <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard icon={<CircleDollarSign className="size-5" />} title={t("metrics.totalTicketsSold")} value={formatNumber(overview.totalTicketsSold)} trend={overview.ticketsTrend} />
            <MetricCard icon={<Gauge className="size-5" />} title={t("metrics.totalRevenue")} value={formatMoney(overview.totalRevenue)} trend={overview.revenueTrend} />
            <MetricCard icon={<CalendarDays className="size-5" />} title={t("metrics.upcomingEvents")} value={formatNumber(overview.upcomingEventsCount)} trend={overview.eventsTrend} />
            <MetricCard icon={<Ticket className="size-5" />} title={t("metrics.checkinsCompleted")} value={formatNumber(overview.checkinsCompleted)} trend={overview.checkinsTrend} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <SalesAnalytics title={t("analytics")} data={chartData} loading={loading} />
              <EventsTable
                title={t("upcomingEvents")}
                search={t("search")}
                eventName={t("eventName")}
                dateTime={t("dateTime")}
                status={t("status")}
                ticketsSold={t("ticketsSold")}
                active={t("active")}
                empty={t("emptyEvents")}
                query={query}
                setQuery={setQuery}
                events={filteredRecentEvents}
                loading={loading}
              />
            </div>

            <div className="space-y-6">
              <DeadlineCalendar title={t("deadlineCalendar")} upcomingLabel={t("upcoming")} events={overview.upcomingEvents} loading={loading} empty={t("emptyUpcoming")} />
              <HelpBox title={t("helpTitle")} description={t("helpDescription")} learnMore={t("learnMore")} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
      <input type="date" value={value} onChange={(event) => onChange(event.target.value)} className="h-10 rounded border border-slate-200 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-slate-700 outline-none focus:border-blue-500" />
    </label>
  );
}

function MetricCard({ icon, title, value, trend }: { icon: React.ReactNode; title: string; value: string; trend: string }) {
  const trendUp = !trend.trim().startsWith("-");
  return (
    <div className="rounded border border-slate-200 bg-white p-5 transition-colors hover:bg-slate-50">
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded bg-blue-50 p-3 text-blue-600">{icon}</div>
        <Info className="size-4 text-slate-300" />
      </div>
      <p className="mb-1 text-sm text-slate-500">{title}</p>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <span className={`rounded px-2 py-1 text-xs font-semibold ${trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
          <TrendingUp className={`mr-1 inline size-3 ${!trendUp && "rotate-180"}`} />
          {trend}
        </span>
      </div>
    </div>
  );
}

function SalesAnalytics({ title, data, loading }: { title: string; data: any; loading: boolean }) {
  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      <div className="p-5">
        <div className="relative h-[320px]">
          {loading && <LoaderOverlay />}
          <Bar data={data} options={chartOptions} />
        </div>
      </div>
    </section>
  );
}

function DeadlineCalendar({ title, upcomingLabel, events, loading, empty }: { title: string; upcomingLabel: string; events: DashboardEvent[]; loading: boolean; empty: string }) {
  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <RefreshCcw className="size-4 text-slate-400" />
      </div>

      <div className="p-5">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{upcomingLabel}</p>
          {loading ? (
            <LoaderRow />
          ) : events.length ? (
            events.slice(0, 5).map((event) => (
              <div key={event.id} className="rounded border border-slate-100 p-3">
                <div className="border-l-2 border-blue-600 pl-3">
                  <p className="text-sm font-semibold text-slate-900">{event.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{upcomingLabel} • {event.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="rounded border border-slate-100 p-4 text-sm text-slate-400">{empty}</p>
          )}
        </div>
      </div>
    </section>
  );
}

function EventsTable({ title, search, eventName, dateTime, status, ticketsSold, active, empty, query, setQuery, events, loading }: any) {
  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <label className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 focus-within:border-blue-400">
            <Search className="size-4 text-slate-400" />
            <input type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={search} className="bg-transparent text-sm outline-none" />
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <Th>{eventName}</Th>
              <Th>{dateTime}</Th>
              <Th>{status}</Th>
              <Th>{ticketsSold}</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-10"><LoaderRow /></td></tr>
            ) : events.length ? (
              events.map((event: DashboardEvent) => (
                <tr key={event.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-900">{event.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{event.date}</td>
                  <td className="px-5 py-4"><span className="inline-flex rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">{event.status || active}</span></td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">{event.tickets}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-slate-400">{empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function HelpBox({ title, description, learnMore }: { title: string; description: string; learnMore: string }) {
  return (
    <section className="rounded bg-blue-600 p-6 text-center text-white">
      <div className="mb-4 inline-flex size-14 items-center justify-center rounded bg-white/20">
        <CircleHelp className="size-7" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-sm text-blue-100">{description}</p>
      <button className="mt-4 rounded bg-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/30">
        {learnMore}
      </button>
    </section>
  );
}

function LoaderOverlay() {
  return <div className="absolute inset-0 z-10 grid place-items-center rounded bg-white/70"><Loader2 className="size-6 animate-spin text-blue-600" /></div>;
}

function LoaderRow() {
  return <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500"><Loader2 className="size-4 animate-spin" />Loading</div>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">{children}</th>;
}

function normalizeOverview(data: any): OverviewData {
  const raw = data?.data ?? data ?? {};
  const metrics = raw.metrics ?? raw.widgets ?? raw.summary ?? raw;
  const analytics = raw.analytics ?? raw.salesAnalytics ?? raw.chart ?? {};
  const upcoming = raw.upcomingEvents ?? raw.upcoming ?? raw.eventsUpcoming ?? [];
  const recent = raw.recentEvents ?? raw.events ?? raw.latestEvents ?? upcoming;

  return {
    totalTicketsSold: numberValue(metrics.totalTicketsSold ?? metrics.ticketsSold ?? metrics.totalTickets ?? metrics.tickets),
    totalRevenue: numberValue(metrics.totalRevenue ?? metrics.revenue ?? metrics.sales),
    upcomingEventsCount: numberValue(metrics.upcomingEvents ?? metrics.upcomingEventsCount ?? (Array.isArray(upcoming) ? upcoming.length : 0)),
    checkinsCompleted: numberValue(metrics.checkinsCompleted ?? metrics.checkins ?? metrics.usedTickets),
    revenueTrend: textValue(metrics.revenueTrend ?? metrics.totalRevenueTrend ?? "0%"),
    ticketsTrend: textValue(metrics.ticketsTrend ?? metrics.totalTicketsSoldTrend ?? "0%"),
    eventsTrend: textValue(metrics.eventsTrend ?? metrics.upcomingEventsTrend ?? "0"),
    checkinsTrend: textValue(metrics.checkinsTrend ?? metrics.checkinsCompletedTrend ?? "0%"),
    analyticsLabels: arrayValue(analytics.labels ?? analytics.months ?? analytics.dates),
    revenueSeries: numberArray(analytics.revenue ?? analytics.revenueSeries ?? analytics.sales),
    ticketsSeries: numberArray(analytics.ticketsSold ?? analytics.ticketsSeries ?? analytics.tickets),
    upcomingEvents: normalizeEvents(upcoming),
    recentEvents: normalizeEvents(recent),
  };
}

function normalizeEvents(rows: any): DashboardEvent[] {
  const list = Array.isArray(rows) ? rows : [];
  return list.map((row: any, index: number) => {
    const start = new Date(row.startAt ?? row.date ?? row.createdAt);
    const sold = row.ticketsSold ?? row.soldTickets ?? row.sold ?? 0;
    const capacity = row.capacity ?? row.totalTickets ?? row.quantity ?? 0;
    return {
      id: row.id ?? String(index),
      name: textValue(row.name ?? row.title ?? row.eventName),
      date: Number.isNaN(start.getTime()) ? textValue(row.date ?? row.startAt) : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(start),
      status: textValue(row.status ?? row.state),
      tickets: capacity ? `${sold} / ${capacity}` : String(sold),
    };
  });
}

function monthStartKey(date: Date) {
  return dateKey(new Date(date.getFullYear(), date.getMonth(), 1));
}

function monthEndKey(date: Date) {
  return dateKey(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatMoney(value: number) {
  return `$${value.toLocaleString()}`;
}

function formatNumber(value: number) {
  return value.toLocaleString();
}

function numberValue(value: any) {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

function numberArray(value: any) {
  return Array.isArray(value) ? value.map(numberValue) : [];
}

function arrayValue(value: any) {
  return Array.isArray(value) ? value.map(textValue) : [];
}

function textValue(value: any) {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return value.fr ?? value.en ?? value.name ?? value.title ?? "";
  return String(value);
}
