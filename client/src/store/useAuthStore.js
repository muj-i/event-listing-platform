import { create } from "zustand";
import axios from "../api/axios";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  login: async (credentials) => {
    const res = await axios.post("/auth/login", credentials);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    set({ user: res.data.user });
  },

  register: async (data) => {
    const res = await axios.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    set({ user: res.data.user });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useAuthStore;