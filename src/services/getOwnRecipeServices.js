import AddRecipe from '../models/AddRecipe.js';
import { paginate } from '../utils/paginate.js';

export const getOwnRecipesService = async (userId, page = 1, perPage = 12) => {
  const limit = Math.min(Math.max(Number(perPage) || 12, 1), 100);
  const currentPage = Math.max(Number(page) || 1, 1);

  const filter = { owner: userId };

  const [totalItems, items] = await Promise.all([
    AddRecipe.countDocuments(filter),
    AddRecipe.find(filter)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .lean(),
  ]);

  const normalized = items.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));

  return {
    data: normalized,
    ...paginate({ totalItems, page: currentPage, perPage: limit }),
  };
};
