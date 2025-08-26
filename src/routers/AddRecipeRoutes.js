import express from 'express';
import { addRecipe } from '../controllers/AddRecipeController';

const router = express.Router();

router.post('/', addRecipe);

export default router;
