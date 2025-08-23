import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidIdRecipe } from '../middlewares/isValidIdRecipe.js';

import { getRecipeByIdController } from '../controllers/recipesControllers.js';

const router = Router();

router.get('/:id', isValidIdRecipe, ctrlWrapper(getRecipeByIdController));

export default router;
