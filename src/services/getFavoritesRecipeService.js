import User from '../models/User.js';
import createHttpError from 'http-errors';

export const getFavoriteRecipesService = async (
  userId,
  page = 1,
  limit = 12,
) => {
  const pageNumber = Math.max(parseInt(page, 10), 1);
  const limitNumber = Math.max(parseInt(limit, 10), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const user = await User.findById(userId).select('favorites');
  if (!user) throw createHttpError(404, 'User not found');

  const total = user.favorites.length;
  const totalPages = Math.ceil(total / limitNumber);

  await user.populate({
    path: 'favorites',
    options: {
      skip,
      limit: limitNumber,
    },
  });

  return {
    recipes: user.favorites,
    total,
    totalPages,
    currentPage: pageNumber,
  };
};
