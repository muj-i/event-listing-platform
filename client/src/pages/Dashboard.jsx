import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useEventStore from "../store/useEventStore";

const Dashboard = () => {
  const { user } = useAuthStore();
  const {
    userEvents,
    fetchUserEvents,
    createEvent,
    deleteEvent,
    updateEvent,
  } = useEventStore();

  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    category: "",
    description: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateEvent(editId, form);
      setEditMode(false);
      setEditId(null);
    } else {
      await createEvent(form);
    }
    setForm({
      name: "",
      date: "",
      time: "",
      location: "",
      category: "",
      description: "",
    });
  };

  const handleEdit = (event) => {
    setEditMode(true);
    setEditId(event._id);
    setForm({
      name: event.name,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      description: event.description,
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>

      {/* 📋 Event Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-8 border p-4 rounded">
        <h3 className="text-xl font-semibold">{editMode ? "Edit Event" : "Create New Event"}</h3>
        <input type="text" name="name" placeholder="Event Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" rows="3" />
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded">
          {editMode ? "Update" : "Create"}
        </button>
      </form>

      {/* 📃 Your Events */}
      <h3 className="text-xl font-semibold mb-2">Your Events</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {userEvents.length > 0 ? (
          userEvents.map((event) => (
            <div key={event._id} className="border rounded p-4 shadow-sm">
              <h4 className="font-bold text-lg">{event.name}</h4>
              <p>{event.date} • {event.time}</p>
              <p className="text-sm text-gray-600">{event.location}</p>
              {event.category && <p className="text-xs text-indigo-600">#{event.category}</p>}
              <div className="mt-2 space-x-2">
                <button onClick={() => handleEdit(event)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(event._id)} className="text-red-500">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>You haven't created any events yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;