import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getIngridients } from '../controllers/ingredientController.js';

const router = Router();

router.get('/', ctrlWrapper(getIngridients));

export default router;
