import { create } from "zustand";
import axios from "../api/axios";

const useCategoryStore = create((set, get) => ({
  categories: [],

  fetchCategories: async () => {
    try {
      const res = await axios.get("/categories/all");
      set({ categories: res.data });
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  },
    createCategory: async (data) => {
    try {
      const res = await axios.post("/categories/create", data);
      set((state) => ({
        categories: [...state.categories, res.data],
      }));
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  }
}));
export default useCategoryStore;