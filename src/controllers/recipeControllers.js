import createHttpError from 'http-errors';
import { getRecipeByIdService } from '../services/recipeServices.js';

export const getRecipeByIdController = async (req, res) => {
  const { recipeId } = req.params;
  const recipe = await getRecipeByIdService(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
};
