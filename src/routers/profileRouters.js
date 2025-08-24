import { Router } from 'express';
import { getOwnRecipesController } from '../controllers/ownProfileController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/own', ctrlWrapper(getOwnRecipesController));

export default router;
