import EventDetailPage from "@/components/events/detail/EventDetailPage";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    return <EventDetailPage slug={slug} />;
}
