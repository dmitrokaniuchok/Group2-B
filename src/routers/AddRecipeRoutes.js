import express from 'express';
import { addRecipe } from '../controllers/AddRecipeController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authentication } from '../middlewares/Authentication.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.post(
  '/',
  authentication,
  upload.single('image'),
  ctrlWrapper(addRecipe),
);

export default router;
