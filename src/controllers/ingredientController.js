import { getIngridientsService } from '../services/ingredientService.js';

export const getIngridients = async (req, res, next) => {
  try {
    const data = await getIngridientsService();
    res.json(data);
  } catch (err) {
    next(err);
  }
};
