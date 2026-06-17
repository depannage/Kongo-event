import { CityPage } from "@/components/website/PageSections";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = slug.charAt(0).toUpperCase() + slug.slice(1);

  return <CityPage city={city || "London"} />;
}
