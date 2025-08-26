import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getIngredientController } from '../controllers/ingredient.js';

const router = Router();

router.get('/', ctrlWrapper(getIngredientController));

export default router;
