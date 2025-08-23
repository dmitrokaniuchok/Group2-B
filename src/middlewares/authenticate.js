import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { Session } from '../models/Session.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
      throw createHttpError(
        401,
        'Authorization header missing or invalid format',
      );
    }

    const token = authHeader.split(' ')[1];

    let payload;

    try {
      payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw createHttpError(401, 'Access token expired');
      }
      throw createHttpError(401, 'Invalid access token');
    }

    const session = await Session.findOne({ accessToken: token });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    req.user = { _id: payload.userId };
    next();
  } catch (error) {
    next(error);
  }
};
