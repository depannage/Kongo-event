import CrudResourcePage from "@/components/resources/CrudResourcePage";

export default function ReviewsPage() {
  return (
    <CrudResourcePage
      title="Reviews"
      description="Moderate real attendee reviews for your events."
      endpoint="/reviews"
      createLabel="Add review"
      fields={[
        { name: "eventId", label: "Event", type: "select", endpoint: "/events", nameKey: "title", required: true },
        { name: "attendeeName", label: "Attendee name" },
        { name: "attendeeEmail", label: "Attendee email" },
        { name: "rating", label: "Rating", type: "number", required: true },
        { name: "title", label: "Title" },
        { name: "comment", label: "Review text", required: true },
        { name: "visibility", label: "Visibility", placeholder: "PUBLIC or HIDDEN" },
      ]}
      columns={[
        { key: "attendeeName", label: "Attendee" },
        { key: "eventName", label: "Event" },
        { key: "rating", label: "Rating" },
        { key: "reviewText", label: "Review" },
        { key: "visibility", label: "Visibility" },
        { key: "helpful", label: "Helpful" },
        { key: "date", label: "Date" },
      ]}
    />
  );
}
