import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
getAllCategories,
createCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/all", getAllCategories);   // Public
router.post("/create", createCategory);   // User-only

export default router;