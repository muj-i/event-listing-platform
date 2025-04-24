import { useEffect } from "react";
import useEventStore from "../store/useEventStore";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { events, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container py-4">
      {/* 🔥 Hero Section */}
      <section className="text-center py-5 mb-5 bg-primary text-white rounded">
        <h1 className="display-4 fw-bold mb-3">Discover Local Events</h1>
        <p className="lead mb-4">Stay updated. Join the fun. Create memories.</p>
        <Link to="/events" className="btn btn-light btn-lg fw-semibold">
          Browse Events
        </Link>
      </section>

      {/* 📅 Upcoming Events */}
      <section className="mb-5">
        <h2 className="h4 fw-semibold mb-3">Upcoming Events</h2>
        <div className="row g-4">
          {events.slice(0, 6).map((event) => (
            <div className="col-sm-6 col-md-4" key={event._id}>
              <Link to={`/events/${event._id}`} className="card h-100 text-decoration-none text-dark shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">{event.date} • {event.time}</p>
                  <p className="text-muted small">{event.location}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 🧭 Categories Section */}
      {/* <section>
        <h2 className="h4 fw-semibold mb-3">Categories</h2>
        <div className="d-flex flex-wrap gap-2">
          {["Music", "Tech", "Food", "Workshop", "Festival", "Sports"].map((cat) => (
            <span key={cat} className="badge bg-secondary fs-6 px-3 py-2 rounded-pill">
              {cat}
            </span>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;