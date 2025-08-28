import { getFavoriteRecipesService } from '../services/getFavoritesRecipeService.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const getFavoriteRecipesController = async (req, res) => {
  const favourites = await getFavoriteRecipesService(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Favorite recipes successfully fetched',
    data: favourites,
  });
};

export const getFavoriteRecipesControllerWrapped = ctrlWrapper(
  getFavoriteRecipesController,
);
