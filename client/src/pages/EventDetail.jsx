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

  if (!event) return <div className="container py-4">Loading event...</div>;

  return (
    <div className="container py-4" style={{ maxWidth: "768px" }}>
      <div className="card shadow-sm p-4">
        <h1 className="h3 fw-bold mb-3">{event.name}</h1>
        <p className="text-muted mb-3">
          📅 {event.date} at ⏰ {event.time} • 📍 {event.location}
        </p>

        {event.category && (
          <span className="badge bg-primary mb-3">{event.category}</span>
        )}

        <p className="fs-5">
          {event.description || "No description provided."}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;