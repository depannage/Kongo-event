import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function FlightOffersPage() {
  return (
    <CrudResourcePage
      title="Flight offers"
      description="Create and manage public flight offers shown on the website."
      endpoint="/flight-offers"
      createLabel="Add flight"
      fields={[
        { name: "origin", label: "Origin", required: true },
        { name: "destination", label: "Destination", required: true },
        { name: "airlineName", label: "Airline" },
        { name: "flightNumber", label: "Flight number" },
        { name: "departureAt", label: "Departure at", placeholder: "2026-07-12T08:00:00.000Z" },
        { name: "arrivalAt", label: "Arrival at", placeholder: "2026-07-12T14:00:00.000Z" },
        { name: "price", label: "Price", type: "number", required: true },
        { name: "currency", label: "Currency", placeholder: "USD" },
        { name: "imageUrl", label: "Image", type: "cloudinary" },
        { name: "seatsAvailable", label: "Seats available", type: "number" },
        { name: "isActive", label: "Active", type: "checkbox" },
      ]}
      columns={[
        { key: "origin", label: "Origin" },
        { key: "destination", label: "Destination" },
        { key: "airlineName", label: "Airline" },
        { key: "flightNumber", label: "Flight" },
        { key: "departureAt", label: "Departure" },
        { key: "price", label: "Price" },
        { key: "currency", label: "Currency" },
        { key: "seatsAvailable", label: "Seats" },
        { key: "isActive", label: "Active" },
      ]}
    />
  );
}
