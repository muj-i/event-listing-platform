import { useEffect } from "react";
import useEventStore from "../store/useEventStore";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { events, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      {/* 🔥 Hero Section */}
      <section className="text-center py-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl mb-6">
        <h1 className="text-4xl font-bold mb-2">Discover Local Events</h1>
        <p className="text-lg mb-4">Stay updated. Join the fun. Create memories.</p>
        <Link to="/events" className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100">
          Browse Events
        </Link>
      </section>

      {/* 📅 Upcoming Events */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {events.slice(0, 6).map((event) => (
            <Link
              to={`/events/${event._id}`}
              key={event._id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold">{event.name}</h3>
              <p>{event.date} • {event.time}</p>
              <p className="text-sm text-gray-600">{event.location}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 🧭 Categories Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {["Music", "Tech", "Food", "Workshop", "Festival", "Sports"].map((cat) => (
            <span key={cat} className="bg-gray-200 px-4 py-2 rounded-full text-sm hover:bg-gray-300 cursor-pointer">
              {cat}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;