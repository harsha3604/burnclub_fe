import EventsClient from "../events/eventsClient";

export const metadata = {
  title: "Events | Forge Athletic Club",
  description: "Upcoming classes, meets, and workshops at Forge Athletic Club.",
};

export default function EventsPage() {
  return <EventsClient />;
}
