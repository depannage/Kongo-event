import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function TicketTypesPage() {
  return (
    <CrudResourcePage
      title="Ticket types"
      description="Gerer les types de billets par evenement."
      endpoint="/ticket-types"
      createLabel="Create ticket type"
      fields={[
        { name: "eventId", label: "Event", type: "select", endpoint: "/events", nameKey: "title", required: true },
        { name: "name", label: "Name", required: true },
        { name: "description", label: "Description" },
        { name: "price", label: "Price", type: "number" },
        { name: "currency", label: "Currency", placeholder: "USD" },
        { name: "quantity", label: "Quantity", type: "number", required: true },
        { name: "saleStartAt", label: "Sale start" },
        { name: "saleEndAt", label: "Sale end" },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "event", label: "Event" },
        { key: "price", label: "Price" },
        { key: "currency", label: "Currency" },
        { key: "quantity", label: "Quantity" },
      ]}
    />
  );
}
