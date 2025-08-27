import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const addRecipeToFavoritesService = async (userId, recipeId) => {
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(recipeId)
  ) {
    throw createHttpError(400, 'Invalid ID');
  }

  const [user, recipe] = await Promise.all([
    User.findById(userId),
    Recipe.findById(recipeId),
  ]);

  if (!user) throw createHttpError(404, 'User not found');

  if (!recipe) throw createHttpError(404, 'Recipe not found');

  if (user.favorites?.some((fav) => fav.toString() === recipeId.toString())) {
    throw createHttpError(409, 'Recipe already in favorites');
  }

  user.favorites = [...(user.favorites || []), recipe._id];
  await user.save();

  const updatedUser = await User.findById(userId).populate(
    'favorites',
    '_id title category thumb',
  );

  return updatedUser.favorites;
};
