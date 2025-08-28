import { searchRecipesService } from '../services/getRecipesServices.js';

export const getRecipesController = async (req, res, next) => {
  try {
    const result = await searchRecipesService(req.query);
    res.status(200).json({
      status: 200,
      message: 'Recipes fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
