import { Ingredient } from '../db/models/Ingredient.js';

export const getIngridientsService = async () => {
  const ingridients = await Ingredient.find();
  return ingridients;
};
