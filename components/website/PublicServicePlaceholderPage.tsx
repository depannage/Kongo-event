"use client";

import Image from "next/image";
import { CalendarDays, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react";
import { WebsiteFooter, WebsiteNav } from "@/components/website/SiteChrome";
import { useGetPublicServiceOffers } from "@/shared/hooks/public-services.hooks";
import type { PublicServiceKind, PublicServiceOffer } from "@/shared/types/public-services.types";

const serviceContent: Record<PublicServiceKind, {
  title: string;
  eyebrow: string;
  subtitle: string;
  image: string;
  searchLabels: [string, string, string];
  cards: Array<PublicServiceOffer>;
}> = {
  buses: {
    title: "Bus Tickets",
    eyebrow: "Travel",
    subtitle: "Compare routes, departure times, and fares for intercity trips.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1800&q=80",
    searchLabels: ["From", "To", "Travel date"],
    cards: [
      { id: "fake-bus-1", service: "bus", title: "Kinshasa - Matadi", subtitle: "06:30 - Express coach", price: 25, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80" },
      { id: "fake-bus-2", service: "bus", title: "Goma - Bukavu", subtitle: "08:00 - Scenic route", price: 18, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1520105072000-f44fc083e508?auto=format&fit=crop&w=900&q=80" },
      { id: "fake-bus-3", service: "bus", title: "Lubumbashi - Kolwezi", subtitle: "10:15 - Comfort seats", price: 32, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=900&q=80" },
    ],
  },
  flights: {
    title: "Flights",
    eyebrow: "Air travel",
    subtitle: "Find flight options for local and regional journeys.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80",
    searchLabels: ["Departure", "Destination", "Flight date"],
    cards: [
      { id: "fake-flight-1", service: "flight", title: "Kinshasa - Goma", subtitle: "Morning departures", price: 210, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=900&q=80" },
      { id: "fake-flight-2", service: "flight", title: "Kinshasa - Lubumbashi", subtitle: "Direct route", price: 240, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" },
      { id: "fake-flight-3", service: "flight", title: "Goma - Nairobi", subtitle: "Regional connection", price: 310, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80" },
    ],
  },
  vouchers: {
    title: "Vouchers",
    eyebrow: "Deals",
    subtitle: "Discover curated deals for food, lifestyle, travel, and entertainment.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1800&q=80",
    searchLabels: ["Category", "City", "Valid until"],
    cards: [
      { id: "fake-voucher-1", service: "voucher", title: "Restaurant Night Out", subtitle: "Dining - Kinshasa", price: 20, discount: 20, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80" },
      { id: "fake-voucher-2", service: "voucher", title: "Spa Weekend Pass", subtitle: "Wellness - Goma", price: 15, discount: 15, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80" },
      { id: "fake-voucher-3", service: "voucher", title: "Cinema Combo", subtitle: "Entertainment", price: 12, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80" },
    ],
  },
  stay: {
    title: "Stay",
    eyebrow: "Hotels",
    subtitle: "Explore accommodation options near your destination and events.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80",
    searchLabels: ["Destination", "Check-in", "Guests"],
    cards: [
      { id: "fake-stay-1", service: "stay", title: "City Center Hotel", subtitle: "Kinshasa - 4-star", price: 95, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80" },
      { id: "fake-stay-2", service: "stay", title: "Lake View Lodge", subtitle: "Goma - Boutique", price: 78, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80" },
      { id: "fake-stay-3", service: "stay", title: "Business Suites", subtitle: "Lubumbashi - Premium", price: 120, currency: "USD", imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80" },
    ],
  },
};

export function PublicServicePlaceholderPage({ service }: { service: PublicServiceKind }) {
  const content = serviceContent[service];
  const offersQuery = useGetPublicServiceOffers(service, { limit: 12 });
  const apiItems = offersQuery.data?.items ?? [];
  const cards = apiItems.length ? apiItems : content.cards;

  return (
    <main className="min-h-screen bg-[#F5F7FC]">
      <WebsiteNav active={content.title} />
      <section className="relative min-h-[520px] overflow-hidden bg-[#131827] text-white">
        <Image src={content.image} alt={content.title} fill priority className="object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131827] via-[#131827]/45 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col justify-end px-6 pb-20 md:px-10">
          <p className="text-sm font-extrabold uppercase tracking-widest text-[#27B7F5]">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-6xl font-extrabold tracking-tight">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-white/85">{content.subtitle}</p>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6 md:px-10">
        <div className="grid gap-3 rounded-2xl border bg-white p-4 shadow-xl md:grid-cols-[1fr_1fr_1fr_auto]">
          {content.searchLabels.map((label) => (
            <label key={label} className="flex min-h-16 items-center gap-3 rounded-xl bg-[#F2F5FA] px-4">
              {label.includes("date") || label.includes("Check") || label.includes("Valid") ? (
                <CalendarDays className="h-5 w-5 text-[#005995]" />
              ) : (
                <MapPin className="h-5 w-5 text-[#005995]" />
              )}
              <span className="font-bold text-slate-500">{label}</span>
            </label>
          ))}
          <button className="inline-flex min-h-16 items-center justify-center gap-2 rounded-xl bg-[#005995] px-7 font-extrabold text-white">
            <Search className="h-5 w-5" />
            Search
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-[#005995]">Featured</p>
            <h2 className="mt-2 text-4xl font-extrabold text-[#131827]">Popular options</h2>
          </div>
          {offersQuery.isLoading ? (
            <p className="max-w-md text-sm font-bold text-slate-500">Loading public offers...</p>
          ) : apiItems.length === 0 ? (
            <p className="max-w-md text-sm font-bold text-slate-500">Demo content is shown until active offers are added in admin.</p>
          ) : null}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="relative h-52">
                <Image src={card.imageUrl || content.image} alt={card.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-sm font-bold text-slate-500">{card.subtitle || serviceLabel(card)}</p>
                <h3 className="mt-2 text-2xl font-extrabold text-[#131827]">{card.title}</h3>
                <p className="mt-5 inline-flex rounded-full bg-[#D9EAFE] px-4 py-2 text-sm font-extrabold text-[#005995]">
                  {formatOfferPrice(card)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-14 md:grid-cols-3 md:px-10">
          {[
            ["Secure booking", "Designed for protected checkout and account access."],
            ["Verified partners", "Ready for integration with approved providers."],
            ["Unified experience", "Same account, tickets, services, and orders."],
          ].map(([title, text]) => (
            <div key={title} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D9EAFE] text-[#005995]">
                {title === "Unified experience" ? <Sparkles className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
              </span>
              <div>
                <h3 className="font-extrabold text-[#131827]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WebsiteFooter />
    </main>
  );
}

function formatOfferPrice(card: PublicServiceOffer) {
  if (card.discount) return `Save ${card.discount}%`;
  return `From ${Number(card.price || 0).toLocaleString("fr-FR")} ${card.currency || "USD"}`;
}

function serviceLabel(card: PublicServiceOffer) {
  if (card.service === "bus") return "Bus route";
  if (card.service === "flight") return "Flight offer";
  if (card.service === "voucher") return "Voucher";
  return "Stay";
}
