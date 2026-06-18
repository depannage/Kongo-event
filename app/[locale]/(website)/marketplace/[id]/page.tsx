import { PublicMarketplaceItemPage } from "@/components/website/PublicMarketplacePage";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MarketplaceItemPage({ params }: Props) {
  const { id } = await params;

  return <PublicMarketplaceItemPage id={id} />;
}
