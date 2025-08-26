import Recipe from '../models/Recipe.js';

export const searchRecipes = async ({ filter, page, perPage }) => {
  const skip = (page - 1) * perPage;

  const recipes = await Recipe.find(filter)
    .skip(skip)
    .limit(perPage)
    .sort({ createdAt: -1 })
    .populate('category', 'name')
    .populate('ingredients.id', 'name');

  const total = await Recipe.countDocuments(filter);

  return {
    recipes,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
};
