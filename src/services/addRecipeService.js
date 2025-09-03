import createHttpError from 'http-errors';
import Recipes from '../models/Recipe.js';

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
    if (!ingredient.id || !ingredient.measure) {
      throw createHttpError(400, 'Each ingredient must have id and measure');
    }
  }

  let imageUrl = null;
  if (file) {
    imageUrl = file.path;
  }

  const newRecipe = await Recipes.create({
    title,
    description,
    time: cookingTime,
    area: calories,
    category,
    ingredients: ingArray,
    instructions,
    thumb: imageUrl,
    owner: userId,
  });

  return newRecipe;
};
