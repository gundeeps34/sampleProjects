import express from "express";
import { getAllRecipes, getIngredient } from "../controllers/recipes.js";

const router = express.Router();

/* REA */
router.get("/", getAllRecipes);
router.get("/:ingredientName", getIngredient)

export default router;

