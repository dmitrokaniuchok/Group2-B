import { addRecipeToFavoritesService } from '../services/addFavoritesService.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const addToFavoritesController = async (req, res) => {
  const favorites = await addRecipeToFavoritesService(
    req.user._id,
    req.params.recipeId,
  );

  res.status(200).json({
    status: 200,
    message: 'Recipe successfully added to favorites',
    data: favorites,
  });
};

export const addToFavoritesControllerWrapped = ctrlWrapper(
  addToFavoritesController,
);
