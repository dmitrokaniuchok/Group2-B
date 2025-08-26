import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidIdRecipe } from '../middlewares/isValidIdRecipe.js';

import { getRecipeByIdController } from '../controllers/recipeControllers.js';
import { getRecipesController } from '../controllers/getRecipesController.js';

const router = Router();

router.get('/', ctrlWrapper(getRecipesController));

router.get('/:recipeId', isValidIdRecipe, ctrlWrapper(getRecipeByIdController));

export default router;
