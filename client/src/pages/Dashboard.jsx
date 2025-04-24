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
    <div className="container py-5">
      <h2 className="mb-4">Welcome, {user?.name}</h2>

      {/* 📋 Event Form */}
      <form onSubmit={handleSubmit} className="card p-4 mb-5 shadow-sm">
        <h3 className="card-title mb-3">{editMode ? "Edit Event" : "Create New Event"}</h3>
        <div className="mb-3">
          <input type="text" name="name" placeholder="Event Name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <input type="time" name="time" value={form.time} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="form-control" rows="3" />
        </div>
        <button type="submit" className="btn btn-primary">
          {editMode ? "Update" : "Create"}
        </button>
      </form>

      {/* 📃 Your Events */}
      <h3 className="mb-3">Your Events</h3>
      <div className="row g-4">
        {userEvents.length > 0 ? (
          userEvents.map((event) => (
            <div key={event._id} className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{event.date} • {event.time}</h6>
                  <p className="card-text">{event.location}</p>
                  {event.category && <p className="badge bg-info text-dark">#{event.category}</p>}
                  <div className="mt-3">
                    <button onClick={() => handleEdit(event)} className="btn btn-sm btn-outline-primary me-2">Edit</button>
                    <button onClick={() => handleDelete(event._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                </div>
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