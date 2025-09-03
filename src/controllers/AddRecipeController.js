import { addRecipeService } from '../services/addRecipeService.js';

export const addRecipe = async (req, res, next) => {
  try {
    const recipe = await addRecipeService({
      body: req.body,
      file: req.file,
      userId: req.user._id,
    });

    const BASE_URL = process.env.SERVER_URL || 'http://localhost:5000';

    const recipeWithFullThumb = {
      ...recipe.toObject(),
      thumb: recipe.thumb ? `${BASE_URL}${recipe.thumb}` : null,
    };

    res.status(201).json({
      status: 201,
      message: 'Recipe created successfully',
      data: { recipe: recipeWithFullThumb },
    });
  } catch (err) {
    next(err);
  }
};
