// src/utils/parseFilterParams.js
import mongoose from 'mongoose';

export const parseFilterParams = (query) => {
  const filter = {};

  // Фільтр за категорією (передавати ObjectId категорії)
  if (query.category) {
    if (mongoose.Types.ObjectId.isValid(query.category)) {
      filter.category = query.category;
    }
  }

  // Фільтр за інгредієнтами (передавати через коми: ingredient1,ingredient2)
  if (query.ingredients) {
    const ingredientIds = query.ingredients
      .split(',')
      .map((id) => id.trim())
      .filter((id) => mongoose.Types.ObjectId.isValid(id));

    if (ingredientIds.length > 0) {
      filter['ingredients.id'] = { $all: ingredientIds };
    }
  }

  // Пошук по назві рецепту (входження рядка, регістронезалежно)
  if (query.title) {
    filter.title = { $regex: query.title, $options: 'i' };
  }

  return filter;
};
