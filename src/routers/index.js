import { Router } from 'express';

import recipeRouter from './recipesRoutes.js';

const router = Router();

router.use('/recipes', recipeRouter);

export default router;
