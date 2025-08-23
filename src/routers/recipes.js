import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

// отримую всі рецепти
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

// додаю рецепт
router.post('/', async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
});

export default router;
