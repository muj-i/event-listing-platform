import { create } from "zustand";
import axios from "../api/axios"; 

const useEventStore = create((set, get) => ({
  events: [],
  userEvents: [],
  selectedEvent: null,

  fetchEvents: async () => {
    try {
      const res = await axios.get("/events");
      set({ events: res.data });
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  },

  fetchUserEvents: async () => {
    try {
      const res = await axios.get("/events/mine");
      set({ userEvents: res.data });
    } catch (err) {
      console.error("Failed to load your events:", err);
    }
  },

  createEvent: async (data) => {
    try {
      const res = await axios.post("/events", data);
      set((state) => ({
        userEvents: [...state.userEvents, res.data],
      }));
    } catch (err) {
      console.error("Failed to create event:", err);
    }
  },

  deleteEvent: async (id) => {
    try {
      await axios.delete(`/events/${id}`);
      set((state) => ({
        userEvents: state.userEvents.filter((e) => e._id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  },

  updateEvent: async (id, data) => {
    try {
      const res = await axios.put(`/events/${id}`, data);
      set((state) => ({
        userEvents: state.userEvents.map((e) =>
          e._id === id ? res.data : e
        ),
      }));
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  },

  getEventByCategory: async (category) => {
   try {
      const events = await axios.get(`/events?category=${category}`);
      if (events.data.length === 0) {
        console.log("No events found for this category.");
        return [];
      }
      return events;
    }
    catch (err) {
      console.error("Failed to filter events by category:", err);
      return [];
    
   }
  },

  setSelectedEvent: (event) => set({ selectedEvent: event }),
}));

export default useEventStore;