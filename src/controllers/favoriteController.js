import { addRecipeToFavoritesService } from '../services/addRecipesFavorites.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const addToFavoritesController = async (req, res) => {
  const favorites = await addRecipeToFavoritesService(
    req.user.id,
    req.params.id,
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
