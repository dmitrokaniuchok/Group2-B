import { Category } from '../db/models/Categories.js';

export const getCategoriesService = async () => {
  const categories = await Category.find();
  return categories;
};
