import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events`);
        const found = res.data.find((e) => e._id === id);
        setEvent(found);
      } catch (err) {
        console.error("Failed to fetch event", err);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div className="p-4">Loading event...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
      <p className="text-gray-600 mb-4">
        📅 {event.date} at ⏰ {event.time} • 📍 {event.location}
      </p>

      {event.category && (
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">
          {event.category}
        </span>
      )}

      <p className="text-lg leading-relaxed text-gray-700">
        {event.description || "No description provided."}
      </p>
    </div>
  );
};

export default EventDetail;