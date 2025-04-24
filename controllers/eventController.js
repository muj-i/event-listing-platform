import Event from "../models/Event.js";

// Get all events
export const getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
};

// Get events by logged-in user
export const getMyEvents = async (req, res) => {
  const events = await Event.find({ user: req.user._id });
  res.json(events);
};

// Create new event
export const createEvent = async (req, res) => {
  const event = new Event({ ...req.body, user: req.user._id });
  const saved = await event.save();
  res.status(201).json(saved);
};

// Delete event
export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await event.deleteOne();
  res.json({ message: "Event deleted" });
};

// Update event
export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};