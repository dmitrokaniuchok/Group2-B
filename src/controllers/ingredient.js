import createHttpError from 'http-errors';
import { getIngredient } from '../services/ingredient.js';

export const getIngredientController = async (req, res) => {
  const ingredient = await getIngredient();

  if (!ingredient) {
    throw createHttpError(404, 'Ingredient not found');
  }

  res.json({
    status: 200,
    message: `Successfully found ingredient!`,
    data: ingredient,
  });
};

