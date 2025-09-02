import createHttpError from 'http-errors';
import Recipes from '../models/Recipe.js';
import path from 'path';
import fs from 'fs';

export const addRecipeService = async ({ body, file, userId }) => {
  const {
    title,
    description,
    cookingTime,
    area,
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

  let imageUrl;
  if (file) {
    const uploadsDir = path.join(process.cwd(), 'uploads', 'recipes');
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });

    const fileName = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, file.buffer);
    imageUrl = `/uploads/recipes/${fileName}`;
  }

  const newRecipe = await Recipes.create({
    title,
    description,
    time: cookingTime,
    area,
    category,
    ingredients: ingArray,
    instructions,
    thumb: imageUrl || null,
    owner: userId,
  });

  return newRecipe;
};
