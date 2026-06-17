import { PublicEventsListPage } from "@/components/website/PublicDataPages";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return <PublicEventsListPage mode="category" slug={slug} title={name || slug} />;
}
