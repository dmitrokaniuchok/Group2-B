import Recipes from '../db/models/Recipe.js';
import { paginate } from '../utils/paginate.js';

export const getRecipesController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page ?? '1', 10);
    const perPage = parseInt(req.query.limit ?? '12', 10);

    const limit = Math.min(Math.max(perPage, 1), 100);
    const currentPage = Math.max(page, 1);

    const [totalItems, items] = await Promise.all([
      Recipes.countDocuments(),
      Recipes.find()
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    const normalized = items.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    res.status(200).json({
      status: 200,
      message: 'Recipes successfully found',
      data: normalized,
      ...paginate({ totalItems, page: currentPage, perPage: limit }),
    });
  } catch (err) {
    next(err);
  }
};
