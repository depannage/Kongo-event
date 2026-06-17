"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import DiscoverSearchBar from "@/components/discover/DiscoverSearchBar";
import DiscoverFilters from "@/components/discover/DiscoverFilters";
import DiscoverEventsGrid from "@/components/discover/DiscoverEventsGrid";
import DiscoverPagination from "@/components/discover/DiscoverPagination";

import { useGetPublicEvents } from "@/shared/hooks/public-event.hooks";
import { useSearch } from "@/shared/hooks/search.hooks";
import type { PublicEvent } from "@/shared/types/public-event.types";

export default function DiscoverPage() {
    const t = useTranslations("discover");

    const [page, setPage] = useState(1);
    const [q, setQ] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");

    const hasSearch = q.trim().length >= 2;

    const publicEventsQuery = useGetPublicEvents({
        page,
        limit: 12,
    });

    const searchQuery = useSearch(
        {
            q,
            type: "events",
            page,
            limit: 12,
        },
        hasSearch
    );

    const rawEvents: PublicEvent[] = hasSearch
        ? searchQuery.data?.results?.events?.data ?? []
        : publicEventsQuery.data?.events ?? [];

    const isLoading = hasSearch ? searchQuery.isLoading : publicEventsQuery.isLoading;
    const isError = hasSearch ? searchQuery.isError : publicEventsQuery.isError;

    const filteredEvents = useMemo(() => {
        return rawEvents.filter((event) => {
            const matchCity = city
                ? event.venue?.city?.toLowerCase().includes(city.toLowerCase())
                : true;

            const matchCategory = category
                ? event.category?.slug === category || event.category?.id === category
                : true;

            return matchCity && matchCategory;
        });
    }, [rawEvents, city, category]);

    const categories = useMemo(() => {
        const allEvents = publicEventsQuery.data?.events ?? [];
        const map = new Map<string, PublicEvent["category"]>();

        allEvents.forEach((event) => {
            if (event.category?.id) {
                map.set(event.category.id, event.category);
            }
        });

        return Array.from(map.values()).filter(Boolean);
    }, [publicEventsQuery.data?.events]);

    const total = hasSearch
        ? searchQuery.data?.results?.events?.total ?? filteredEvents.length
        : publicEventsQuery.data?.total ?? filteredEvents.length;

    const pages = hasSearch
        ? Math.max(1, Math.ceil(total / 12))
        : publicEventsQuery.data?.pages ?? 1;

    const handleSearch = (nextQ: string, nextCity: string) => {
        setQ(nextQ.trim());
        setCity(nextCity.trim());
        setPage(1);
    };

    const resetFilters = () => {
        setQ("");
        setCity("");
        setCategory("");
        setPage(1);
    };

    return (
        <main className="min-h-screen bg-[#F5F7FC]">
          <Nav/>
            <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
                <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-[#131827] md:text-5xl">
                    {t("title")}
                </h1>

                <DiscoverSearchBar
                    defaultQ={q}
                    defaultCity={city}
                    onSearch={handleSearch}
                />

                <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
                    <DiscoverFilters
                        categories={categories}
                        selectedCategory={category}
                        onCategoryChange={(value) => {
                            setCategory(value);
                            setPage(1);
                        }}
                        onReset={resetFilters}
                    />

                    <div>
                        <div className="mb-8 flex items-center justify-between">
                            <p className="text-gray-600">
                                {t("showing")}{" "}
                                <span className="font-bold text-[#131827]">{total}</span>{" "}
                                {t("events")}
                            </p>

                            <select className="rounded-xl border bg-white px-4 py-2 text-sm outline-none">
                                <option>{t("relevance")}</option>
                            </select>
                        </div>

                        <DiscoverEventsGrid
                            events={filteredEvents}
                            isLoading={isLoading}
                            isError={isError}
                        />

                        <DiscoverPagination page={page} pages={pages} onChange={setPage} />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
