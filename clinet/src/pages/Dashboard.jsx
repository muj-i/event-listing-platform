import React, { useEffect, useState } from "react";
import useEventStore from "../store/useEventStore";

const Dashboard = () => {
  const { userEvents, fetchUserEvents, createEvent, deleteEvent } = useEventStore();
  const [form, setForm] = useState({ name: "", date: "", time: "", location: "", description: "" });

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(form);
    setForm({ name: "", date: "", time: "", location: "", description: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Events</h2>
      <form onSubmit={handleSubmit} className="space-y-2 max-w-md mb-6">
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border p-2 rounded" />
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border p-2 rounded" />
        <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full border p-2 rounded" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Create Event</button>
      </form>

      <ul className="space-y-2">
        {userEvents.map((event) => (
          <li key={event._id} className="border p-2 rounded flex justify-between">
            <span>{event.name} — {event.date}</span>
            <button onClick={() => deleteEvent(event._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;