import Recipe from '../models/AddRecipe.js';

export const addRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({ ...req.body, owner: req.user._id });

    await recipe.save();

    res.status(201).json({
      status: 201,
      message: 'Recipe created successfully',
      data: recipe,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
