import {PublicEvent} from "@/shared/types/public-event.types";
import RichTextContent from "@/components/website/RichTextContent";


type Props = {
    event: PublicEvent;
};

export default function EventAbout({ event }: Props) {
    const description = event.description || event.shortDescription;

    return (
        <section className="py-8">
            <h2 className="mb-6 font-bold text-[#131827]">About This Event</h2>

            <RichTextContent
                html={description}
                fallback="No description available for this event."
            />

            <ul className="mt-8 space-y-3 text-gray-700">
                <li>Category: {event.category?.name}</li>
                <li>Type: {event.type}</li>
                <li>Capacity: {event.capacity}</li>
                <li>Timezone: {event.timezone}</li>
            </ul>
        </section>
    );
}
