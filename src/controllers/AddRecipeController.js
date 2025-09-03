import { addRecipeService } from '../services/addRecipeService.js';

export const addRecipe = async (req, res, next) => {
  try {
    const recipe = await addRecipeService({
      body: req.body,
      file: req.file,
      userId: req.user._id,
    });

    res.status(201).json({
      status: 201,
      message: 'Recipe created successfully',
      data: { recipe },
    });
  } catch (err) {
    next(err);
  }
};
