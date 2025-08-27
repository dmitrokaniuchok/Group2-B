import { Router } from 'express';
import { addToFavoritesControllerWrapped } from '../controllers/favoriteController.js';
import { removeFromFavoritesControllerWrapped } from '../controllers/removeFavoriteController.js';
import { authentication } from '../middlewares/Authentication.js';

const router = Router();

router.post('/:recipeId', authentication, addToFavoritesControllerWrapped);

router.delete(
  '/:recipeId',
  authentication,
  removeFromFavoritesControllerWrapped,
);

export default router;
