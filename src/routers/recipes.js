import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getRecipesController } from '../controllers/getRecipesController.js';

const router = Router();

router.get('/', ctrlWrapper(getRecipesController));

export default router;
