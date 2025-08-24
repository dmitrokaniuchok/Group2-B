import { Router } from 'express';
import { addToFavoritesControllerWrapped } from '../controllers/favoriteController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post('/:id', ctrlWrapper(addToFavoritesControllerWrapped));

export default router;
