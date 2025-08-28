import createHttpError from 'http-errors';
import { getCurrentUserService } from '../services/userServices.js';

export async function getCurrentUserController(req, res) {
  const current = await getCurrentUserService(req.user.id);

  if (!current) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Current user fetched successfully',
    data: current,
  });
}
