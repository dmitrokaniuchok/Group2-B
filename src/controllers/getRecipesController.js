import { parseFilterParams } from '../utils/parseFilterParams.js';
import { paginate } from '../utils/paginate.js';
import { searchRecipes } from '../services/getRecipesServices.js';

export const getRecipesController = async (req, res, next) => {
  try {
    const { page, perPage } = paginate(req.query);
    const filter = parseFilterParams(req.query);

    const data = await searchRecipes({ filter, page, perPage });

    res.json({
      status: 200,
      message: 'Recipes retrieved successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};
