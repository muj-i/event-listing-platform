import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{event.name}</h2>
      <p>{event.date} at {event.time}</p>
      <p className="text-sm text-gray-600">{event.location}</p>
      <Link to={`/events/${event._id}`} className="text-blue-500 mt-2 block">View Details</Link>
    </div>
  );
};

export default EventCard;