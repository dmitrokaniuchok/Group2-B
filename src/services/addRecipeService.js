import createHttpError from 'http-errors';
import AddRecipe from '../models/AddRecipe.js';

export const addRecipeService = async ({ body, file, userId }) => {
  const {
    title,
    description,
    cookingTime,
    calories,
    category,
    ingredients,
    instructions,
  } = body;

  if (!title || !cookingTime || !category || !ingredients || !instructions) {
    throw createHttpError(400, 'Missing required fields');
  }

  const ingArray =
    typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;

  if (!Array.isArray(ingArray) || ingArray.length === 0) {
    throw createHttpError(400, 'Ingredients must be a non-empty array');
  }

  for (const ingredient of ingArray) {
    if (!ingredient.name || !ingredient.amount) {
      throw createHttpError(400, 'Each ingredient must have name and amount');
    }
  }

  const imageUrl = file ? file.path : undefined;

  const newRecipe = await AddRecipe.create({
    title,
    description,
    cookingTime,
    calories,
    category,
    ingredients: ingArray,
    instructions,
    image: imageUrl,
    owner: userId,
  });

  return newRecipe;
};
