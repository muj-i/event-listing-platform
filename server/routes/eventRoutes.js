import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getAllEvents,
  getMyEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);               // Public
router.get("/mine", protect, getMyEvents);   // User-only
router.post("/", protect, createEvent);      // User-only
router.delete("/:id", protect, deleteEvent); // User-only
router.put("/:id", protect, updateEvent);    // User-only

export default router;