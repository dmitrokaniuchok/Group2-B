import { Router } from 'express';

import recipeRouter from './recipesRouters.js';
import profileRouter from './profileRouters.js';
import favoritesRouter from './favoritesRouter.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Server is working!');
}); // Тестовий маршрут

router.use('/recipes', recipeRouter);
router.use('/profile', profileRouter);
router.use('/favorites', favoritesRouter);

export default router;
