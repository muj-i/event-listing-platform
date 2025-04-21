import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`/api/events/${id}`);
      setEvent(res.data);
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">{event.name}</h2>
      <p>
        {event.date} at {event.time} — {event.location}
      </p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventDetail;