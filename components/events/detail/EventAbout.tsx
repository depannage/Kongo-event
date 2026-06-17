import {PublicEvent} from "@/shared/types/public-event.types";


type Props = {
    event: PublicEvent;
};

export default function EventAbout({ event }: Props) {
    return (
        <section className="py-8">
            <h2 className="mb-6 font-bold text-[#131827]">About This Event</h2>

            <p className="max-w-3xl leading-8 text-gray-600">
                {event.shortDescription || "No description available for this event."}
            </p>

            <ul className="mt-8 space-y-3 text-gray-700">
                <li>Category: {event.category?.name}</li>
                <li>Type: {event.type}</li>
                <li>Capacity: {event.capacity}</li>
                <li>Timezone: {event.timezone}</li>
            </ul>
        </section>
    );
}
