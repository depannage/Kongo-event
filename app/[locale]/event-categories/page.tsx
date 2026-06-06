import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function EventCategoriesPage() {
  return (
    <CrudResourcePage
      title="Event categories"
      description="Creer, modifier et supprimer les categories d'evenements."
      endpoint="/event-categories"
      createLabel="Create category"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "slug", label: "Slug", required: true, placeholder: "music-festival" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "createdAt", label: "Created" },
      ]}
    />
  );
}
