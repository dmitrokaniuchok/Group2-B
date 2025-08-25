import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { removeFromFavoritesControllerWrapped } from '../controllers/removeFavoriteController.js';

const router = Router();

router.delete('/:id', ctrlWrapper(removeFromFavoritesControllerWrapped));

export default router;
