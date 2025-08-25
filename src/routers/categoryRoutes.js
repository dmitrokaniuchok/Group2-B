import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCategories } from '../controllers/categoryController.js';

const router = Router();

router.get('/', ctrlWrapper(getCategories));

export default router;
