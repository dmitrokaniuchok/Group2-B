import { Categories } from '../models/Categories.js';

export const getCategories = async () => {
  return await Categories.find();
};
