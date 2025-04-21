import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || "",

  login: async (data) => {
    try {
      const res = await axios.post("/api/auth/login", data);
      localStorage.setItem("token", res.data.token);
      set({ token: res.data.token, user: res.data.user });
    } catch (err) {
      alert("Login failed");
    }
  },

  register: async (data) => {
    try {
      const res = await axios.post("/api/auth/register", data);
      localStorage.setItem("token", res.data.token);
      set({ token: res.data.token, user: res.data.user });
    } catch (err) {
      alert("Registration failed");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: "", user: null });
  },
}));

export default useAuthStore;