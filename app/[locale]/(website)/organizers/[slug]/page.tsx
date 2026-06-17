import { PublicOrganizerPage } from "@/components/website/PublicDataPages";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PublicOrganizerPage slug={slug} />;
}
