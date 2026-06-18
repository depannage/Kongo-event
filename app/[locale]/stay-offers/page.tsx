import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function StayOffersPage() {
  return (
    <CrudResourcePage
      title="Stay offers"
      description="Create and manage public stay offers shown on the website."
      endpoint="/stay-offers"
      createLabel="Add stay"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "city", label: "City" },
        { name: "country", label: "Country" },
        { name: "address", label: "Address" },
        { name: "description", label: "Description" },
        { name: "price", label: "Price", type: "number", required: true },
        { name: "currency", label: "Currency", placeholder: "USD" },
        { name: "imageUrl", label: "Image", type: "cloudinary" },
        { name: "rating", label: "Rating", type: "number" },
        { name: "roomsAvailable", label: "Rooms available", type: "number" },
        { name: "isActive", label: "Active", type: "checkbox" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "city", label: "City" },
        { key: "country", label: "Country" },
        { key: "price", label: "Price" },
        { key: "currency", label: "Currency" },
        { key: "rating", label: "Rating" },
        { key: "roomsAvailable", label: "Rooms" },
        { key: "isActive", label: "Active" },
      ]}
    />
  );
}
