import React, { useEffect } from "react";
import useEventStore from "../store/useEventStore";
import EventCard from "../components/EventCard";

const EventList = () => {
  const { events, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="h4 fw-bold mb-4">All Events</h2>
      <div className="row g-4">
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="col-sm-6 col-md-4">
              <EventCard event={event} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;