import { Router } from 'express';

import recipesRouter from './recipesRouters.js';
import profileRouter from './profileRouters.js';
import favoritesRouter from './favoritesRouter.js';
import categories from './categories.js';
import ingredients from './ingredients.js';
import auth from './auth.js';
import addRecipeRouter from './AddRecipeRoutes.js';

const router = Router();

router.use('/auth', auth);
router.use('/profile', profileRouter);
router.use('/categories', categories);
router.use('/ingredients', ingredients);
console.log('Favorites router loaded');
router.use('/favorites', favoritesRouter);
router.use('/recipes/add', addRecipeRouter);
router.use('/recipes', recipesRouter);

export default router;
