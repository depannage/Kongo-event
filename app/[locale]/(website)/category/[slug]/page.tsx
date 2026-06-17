import { CategoryPage } from "@/components/website/PageSections";

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

  return <CategoryPage name={name || "Rhythms of the Night"} />;
}
