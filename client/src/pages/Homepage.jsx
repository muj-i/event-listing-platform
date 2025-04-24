import { useEffect, useState } from "react";
import useEventStore from "../store/useEventStore";
import { Link } from "react-router-dom";
import useCategoryStore from "../store/useCategoryStore";


const HomePage = () => {
  const { events, fetchEvents, getEventByCategory } = useEventStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchEvents();
    fetchCategories().finally(() => setLoading(false));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    getEventByCategory(category);
  };

  const filteredEvents = selectedCategory
    ? events.filter((event) => event.category === selectedCategory)
    : events;

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
      {/* 🧭 Categories Section */}
      <section>
        <h2 className="h4 fw-semibold mb-3">Categories</h2>
        {loading ? (
          <div className="text-center">Loading categories...</div>
        ) : (
          <div className="d-flex flex-wrap gap-2">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <span
                  key={cat._id}
                  className="badge bg-secondary fs-6 px-3 py-2 rounded-pill cursor-pointer"
                  onClick={() => handleCategoryClick(cat.category)}
                >
                  {cat.category}
                </span>
              ))
            ) : (
              <p className="text-muted">No categories available.</p>
            )}
          </div>
        )}
      </section>

      {/* 📅 Upcoming Events */}
      <section className="mb-5 mt-4">
        <h2 className="h4 fw-semibold mb-3">Upcoming Events</h2>
        {loading ? (
          <div className="text-center">Loading events...</div>
        ) : filteredEvents.length > 0 ? (
          <div className="row g-4">
            {filteredEvents.slice(0, 6).map((event) => (
              <div className="col-sm-6 col-md-4" key={event._id}>
                <Link to={`/events/${event._id}`} className="card h-100 text-decoration-none text-dark shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <p className="card-text">{event.date} • {event.time}</p>
                    <p className="text-muted small">{event.location}</p>
                    {event.category && (
                      <p className="badge bg-info text-dark mt-2">#{event.category}</p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No events found.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;