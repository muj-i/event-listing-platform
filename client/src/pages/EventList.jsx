import React, { useEffect } from "react";
import useEventStore from "../store/useEventStore";
import EventCard from "../components/EventCard";

const EventList = () => {
  const { events, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Events</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => <EventCard key={event._id} event={event} />)
        )}
      </div>
    </div>
  );
};

export default EventList;