import Users from '../db/models/User.js';
import Recipes from '../db/models/Recipe.js';

export const removeRecipeFromFavoritesService = async (userId, recipeId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throw new Error(404, 'User not found');
  }

  const recipe = await Recipes.findById(recipeId);
  if (!recipe) {
    throw new Error(404, 'Recipe not found');
  }

  user.favorites = user.favorites.filter(
    (favId) => favId.toString() !== recipeId,
  );

  await user.save();

  await user.populate('favorites');
  return user.favorites;
};
