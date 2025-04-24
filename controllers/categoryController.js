import Category from "../models/Category.js";

// Get all categories
export const getAllCategories = async (req, res) => {
    const categories = await Category.find().sort({ date: 1 });
    res.json(categories);
};

// Create new category
export const createCategory = async (req, res) => {
    console.log(req.body);
    const category = new Category(req.body);
    const allCategories = await Category.find();
    if (allCategories.some((cat) => cat.category === category.category)) {
        return res.status(201).json({ message: "Category already exists" });
    }
    const saved = await category.save();
    res.status(201).json(saved);
};

