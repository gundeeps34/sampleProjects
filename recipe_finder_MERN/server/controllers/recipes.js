import Recipe from "../models/Recipe";
import Ingredients from "../models/Ingredients";

/* READ */
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getIngredient = async(req, res) => {
    try{
        const { ingredientName } = req.body;
        const ingredient = await Ingredients.find({ name: ingredientName});
        res.status(200).json(ingredient)
    }catch(err){
        res.status(404).json({ message: err.message });
    }
};