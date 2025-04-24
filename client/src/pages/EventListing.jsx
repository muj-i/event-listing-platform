import { useEffect } from "react";
import useEventStore from "../store/useEventStore";
import { Link } from "react-router-dom";

const EventListing = () => {
  const { events, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="h3 fw-bold text-center mb-4">All Events</h2>

      <div className="row g-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="col-sm-6 col-md-4">
              <Link to={`/events/${event._id}`} className="card h-100 text-decoration-none text-dark shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-1">{event.name}</h5>
                  <p className="card-subtitle text-muted mb-1">{event.date} • {event.time}</p>
                  <p className="card-text small">{event.location}</p>
                  {event.category && (
                    <span className="badge bg-info text-dark">{event.category}</span>
                  )}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventListing;