import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function BusRoutesPage() {
  return (
    <CrudResourcePage
      title="Bus routes"
      description="Create and manage public bus routes shown on the website."
      endpoint="/bus-routes"
      createLabel="Add route"
      fields={[
        { name: "origin", label: "Origin", required: true },
        { name: "destination", label: "Destination", required: true },
        { name: "operatorName", label: "Operator" },
        { name: "departureAt", label: "Departure at", placeholder: "2026-07-12T08:00:00.000Z" },
        { name: "arrivalAt", label: "Arrival at", placeholder: "2026-07-12T18:00:00.000Z" },
        { name: "price", label: "Price", type: "number", required: true },
        { name: "currency", label: "Currency", placeholder: "USD" },
        { name: "imageUrl", label: "Image", type: "cloudinary" },
        { name: "seatsAvailable", label: "Seats available", type: "number" },
        { name: "isActive", label: "Active", type: "checkbox" },
      ]}
      columns={[
        { key: "origin", label: "Origin" },
        { key: "destination", label: "Destination" },
        { key: "operatorName", label: "Operator" },
        { key: "departureAt", label: "Departure" },
        { key: "price", label: "Price" },
        { key: "currency", label: "Currency" },
        { key: "seatsAvailable", label: "Seats" },
        { key: "isActive", label: "Active" },
      ]}
    />
  );
}
