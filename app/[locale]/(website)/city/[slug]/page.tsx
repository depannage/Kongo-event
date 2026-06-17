import { PublicEventsListPage } from "@/components/website/PublicDataPages";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = slug.charAt(0).toUpperCase() + slug.slice(1);

  return <PublicEventsListPage mode="city" slug={slug} title={city || slug} />;
}
