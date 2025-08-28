import express from 'express';
import { addRecipe } from '../controllers/AddRecipeController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authentication } from '../middlewares/Authentication.js';

const router = express.Router();

router.post('/', authentication, ctrlWrapper(addRecipe));

export default router;
