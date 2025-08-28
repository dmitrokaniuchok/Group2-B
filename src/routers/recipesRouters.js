import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidIdRecipe } from '../middlewares/isValidIdRecipe.js';

import { getOwnRecipesController } from '../controllers/ownProfileController.js';
import { getRecipeByIdController } from '../controllers/recipeControllers.js';
import { getRecipesController } from '../controllers/getRecipesController.js';
import { authentication } from '../middlewares/Authentication.js';

const router = Router();

router.get('/', ctrlWrapper(getRecipesController));

router.get('/my', authentication, ctrlWrapper(getOwnRecipesController));

router.get('/:recipeId', isValidIdRecipe, ctrlWrapper(getRecipeByIdController));

export default router;

// +
