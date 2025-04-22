import { useEffect } from "react";
import useEventStore from "../store/useEventStore";
import { Link } from "react-router-dom";

const EventListing = () => {
  const { events, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Events</h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <Link
              key={event._id}
              to={`/events/${event._id}`}
              className="border rounded-lg shadow hover:shadow-lg p-4 transition"
            >
              <h3 className="text-xl font-bold mb-1">{event.name}</h3>
              <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
              <p className="text-sm text-gray-500">{event.location}</p>
              {event.category && (
                <span className="inline-block mt-2 bg-indigo-100 text-indigo-600 px-3 py-1 text-xs rounded-full">
                  {event.category}
                </span>
              )}
            </Link>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventListing;