import { getFavoriteRecipesService } from '../services/getFavoritesRecipeService.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const getFavoriteRecipesController = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const favourites = await getFavoriteRecipesService(req.user._id, page, limit);

  res.status(200).json({
    status: 200,
    message: 'Favorite recipes successfully fetched',
    data: favourites,
  });
};

export const getFavoriteRecipesControllerWrapped = ctrlWrapper(
  getFavoriteRecipesController,
);
