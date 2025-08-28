import User from '../models/User.js';
import createHttpError from 'http-errors';

export const getFavoriteRecipesService = async (userId) => {
  const user = await User.findById(userId).populate(
    'favorites',
    '_id title category thumb',
  );

  if (!user) throw createHttpError(404, 'User not found');

  return user.favorites;
};
