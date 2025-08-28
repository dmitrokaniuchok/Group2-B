import Recipes from '../models/Recipe.js';
import { Ingredient } from '../models/Ingredient.js';

export const searchRecipesService = async (query) => {
  const { category, ingredient, title, page = 1 } = query;

  const pageNumber = Math.max(parseInt(page, 10), 1);
  const limitNumber = 12;
  const skip = (pageNumber - 1) * limitNumber;

  const filter = {};

  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }

  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }

  if (ingredient) {
    const ingredientIds = (
      await Ingredient.find({ name: { $regex: ingredient, $options: 'i' } })
    ).map((i) => i._id);

    filter['ingredients'] = { $elemMatch: { id: { $in: ingredientIds } } };
  }

  const recipes = await Recipes.find(filter).skip(skip).limit(limitNumber);

  const total = await Recipes.countDocuments(filter);
  const totalPages = Math.ceil(total / limitNumber);

  return { recipes, page: pageNumber, totalPages, total };
};
