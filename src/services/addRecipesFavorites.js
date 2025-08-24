import Users from '../db/models/User.js';
import Recipes from '../db/models/Recipe.js';

export const addRecipeToFavoritesService = async (userId, recipeId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throw new Error(404, 'User not found');
  }

  const recipe = await Recipes.findById(recipeId);
  if (!recipe) {
    throw new Error(404, 'Recipe not found');
  }

  if (!user.savedRecipes.includes(recipeId)) {
    user.savedRecipes.push(recipeId);
    await user.save();
  }

  await user.populate('savedRecipes');
  return user.savedRecipes;
};
