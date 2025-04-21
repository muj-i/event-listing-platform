import { create } from "zustand";
import axios from "axios";

const useEventStore = create((set, get) => ({
  events: [],
  userEvents: [],

  fetchEvents: async () => {
    const res = await axios.get("/api/events");
    set({ events: res.data });
  },

  fetchUserEvents: async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/events/mine", {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ userEvents: res.data });
  },

  createEvent: async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.post("/api/events", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set((state) => ({
      userEvents: [...state.userEvents, res.data],
    }));
  },

  deleteEvent: async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`/api/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set((state) => ({
      userEvents: state.userEvents.filter((e) => e._id !== id),
    }));
  },
}));

export default useEventStore;