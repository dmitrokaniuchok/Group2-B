import { Ingredient } from "../db/models/Ingredient.js";

export const getIngredient = async () => {
  return await Ingredient.find();
};