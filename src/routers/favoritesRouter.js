import { Router } from 'express';
import { getFavoriteRecipesControllerWrapped } from '../controllers/getFavoriteRecipesController.js';
import { addToFavoritesControllerWrapped } from '../controllers/favoriteController.js';
import { removeFromFavoritesControllerWrapped } from '../controllers/removeFavoriteController.js';
import { authentication } from '../middlewares/Authentication.js';

const router = Router();

router.get('/', authentication, getFavoriteRecipesControllerWrapped);

router.post('/:recipeId', authentication, addToFavoritesControllerWrapped);

router.delete(
  '/:recipeId',
  authentication,
  removeFromFavoritesControllerWrapped,
);

export default router;
