import { Ingredient } from '../models/Ingredient.js';

export const getIngredient = async () => {
  return await Ingredient.find();
};
