import { getCategoriesService } from '../services/categoryService.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json({
      status: 200,
      message: 'Successfully found categories!',
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};
