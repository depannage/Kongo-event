import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function ManageTicketsPage() {
  return (
    <CrudResourcePage
      title="Tickets"
      description="Gerer les tickets, QR codes et statuts."
      endpoint="/tickets"
      createLabel="Create ticket"
      fields={[
        { name: "eventId", label: "Event", type: "select", endpoint: "/events", nameKey: "title", required: true },
        { name: "ticketTypeId", label: "Ticket type", type: "select", endpoint: "/api/v1/ticket-types", required: true },
        { name: "userId", label: "User ID" },
        { name: "code", label: "Code" },
        { name: "qrCodeUrl", label: "QR code URL", type: "cloudinary" },
        { name: "status", label: "Status" },
      ]}
      columns={[
        { key: "code", label: "Code" },
        { key: "event", label: "Event" },
        { key: "ticketType", label: "Ticket type" },
        { key: "user", label: "User" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
