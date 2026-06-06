import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function EventSponsorsPage() {
  return (
    <CrudResourcePage
      title="Event sponsors"
      description="Attacher et detacher des sponsors aux evenements."
      endpoint="/event-sponsors"
      createLabel="Attach sponsor"
      idFields={["eventId", "sponsorId"]}
      canUpdate={false}
      fields={[
        { name: "eventId", label: "Event", type: "select", endpoint: "/events", nameKey: "title", required: true },
        { name: "sponsorId", label: "Sponsor", type: "select", endpoint: "/sponsors", required: true },
      ]}
      columns={[
        { key: "event", label: "Event" },
        { key: "sponsor", label: "Sponsor" },
        { key: "eventId", label: "Event ID" },
        { key: "sponsorId", label: "Sponsor ID" },
      ]}
    />
  );
}
