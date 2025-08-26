import { Router } from 'express';

import recipesRouter from './recipesRouters.js';
import profileRouter from './profileRouters.js';
import favoritesRouter from './favoritesRouter.js';
import categories from './categories.js';
import ingredients from './ingredients.js';
// import userRoutes from './userRoutes.js';

const router = Router();

// router.use('/users', userRoutes);
router.use('/categories', categories);
router.use('/ingredients', ingredients);
router.use('/profile', profileRouter);
router.use('/favorites', favoritesRouter);
router.use('/recipes', recipesRouter);

export default router;
