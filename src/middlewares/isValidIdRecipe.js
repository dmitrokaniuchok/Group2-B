import createHttpError from 'http-errors';

export const isValidIdRecipe = (req, res, next) => {
  const { recipeId } = req.params;
  const isValid = /^[0-9a-fA-F]{24}$/.test(recipeId);

  if (!isValid) {
    return next(createHttpError(400, 'Invalid recipe ID format'));
  }

  next();
};
