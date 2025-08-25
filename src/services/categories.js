import { Categories } from "../db/models/Categories.js";

export const getCategories = async () => {
  return await Categories.find();
};