import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function SponsorsPage() {
  return (
    <CrudResourcePage
      title="Sponsors"
      description="Gerer les sponsors et leurs logos Cloudinary."
      endpoint="/sponsors"
      createLabel="Create sponsor"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "logoUrl", label: "Logo", type: "cloudinary", placeholder: "https://res.cloudinary.com/..." },
        { name: "website", label: "Website", type: "url", placeholder: "https://example.com" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "website", label: "Website" },
        { key: "logoUrl", label: "Logo" },
        { key: "createdAt", label: "Created" },
      ]}
    />
  );
}
