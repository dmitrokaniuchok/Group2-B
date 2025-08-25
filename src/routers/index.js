import { Router } from 'express';

import recipesRouter from './recipesRouters.js';
import profileRouter from './profileRouters.js';
import favoritesRouter from './favoritesRouter.js';
import categoryRoutes from './categoryRoutes.js';
import ingredientRoutes from './ingredientRoutes.js';
// import userRoutes from './userRoutes.js';

const router = Router();

// router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/profile', profileRouter);
router.use('/favorites', favoritesRouter);
router.use('/recipes', recipesRouter);

export default router;
