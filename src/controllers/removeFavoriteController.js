import { removeRecipeFromFavoritesService } from '../services/removeRecipeFromFavoritesService.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const removeFromFavoritesController = async (req, res) => {
  const favorites = await removeRecipeFromFavoritesService(
    req.user._id,
    req.params.recipeId,
  );

  res.status(200).json({
    status: 200,
    message: 'Recipe successfully removed from favorites',
    data: favorites,
  });
};

export const removeFromFavoritesControllerWrapped = ctrlWrapper(
  removeFromFavoritesController,
);
