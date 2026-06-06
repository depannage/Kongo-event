import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function VenuesPage() {
  return (
    <CrudResourcePage
      title="Venues"
      description="Gerer les lieux utilises par les evenements."
      endpoint="/venues"
      createLabel="Create venue"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "address", label: "Address" },
        { name: "city", label: "City" },
        { name: "country", label: "Country" },
        { name: "latitude", label: "Latitude", type: "number" },
        { name: "longitude", label: "Longitude", type: "number" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "city", label: "City" },
        { key: "country", label: "Country" },
        { key: "address", label: "Address" },
      ]}
    />
  );
}
