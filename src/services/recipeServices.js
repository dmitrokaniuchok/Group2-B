import Recipes from '../db/models/Recipe.js';

export const getRecipeByIdService = async (recipeId) => {
  const recipe = await Recipes.findById(recipeId);

  return recipe ? { id: recipe._id.toString(), ...recipe } : null;
};
