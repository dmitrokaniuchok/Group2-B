import createHttpError from 'http-errors';
import { getCategories } from '../services/categories.js';

export const getCategoriesController = async (req, res) => {
  const categories = await getCategories();

  if (!categories) {
    throw createHttpError(404, 'categories not found');
  }

  res.json({
    status: 200,
    message: `Successfully found categories!`,
    data: categories,
  });
};
