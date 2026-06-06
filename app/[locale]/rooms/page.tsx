import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function RoomsPage() {
  return (
    <CrudResourcePage
      title="Rooms"
      description="Gerer les salles liees aux lieux."
      endpoint="/rooms"
      createLabel="Create room"
      fields={[
        { name: "venueId", label: "Venue", type: "select", endpoint: "/venues", required: true },
        { name: "name", label: "Name", required: true },
        { name: "capacity", label: "Capacity", type: "number" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "venue", label: "Venue" },
        { key: "capacity", label: "Capacity" },
        { key: "createdAt", label: "Created" },
      ]}
    />
  );
}
