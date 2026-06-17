import { CheckoutPage } from "@/components/website/PageSections";
import type { PublicEvent } from "@/shared/types/public-event.types";

type PageProps = {
  searchParams?: Promise<{
    event?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const eventSlug = params?.event;
  const event = eventSlug ? await getPublicEvent(eventSlug) : null;

  return <CheckoutPage event={event} />;
}

async function getPublicEvent(slug: string): Promise<PublicEvent | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return null;
  }

  const response = await fetch(`${baseUrl}/public/events/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  }).catch(() => null);

  if (!response?.ok) {
    return null;
  }

  return response.json();
}
