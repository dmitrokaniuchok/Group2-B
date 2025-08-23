import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/User.js';
import { Session } from '../models/Session.js';
import jwt from 'jsonwebtoken';

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'This email in use!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await Session.findOneAndDelete({ userId: user._id });

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15m',
    },
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '30d',
    },
  );

  const now = new Date();
  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now.getTime() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
};

export const refreshSession = async (refreshToken) => {
  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token is missing');
  }

  let payload;

  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw createHttpError(401, 'Invalid refresh token');
  }

  const existingSession = await Session.findOne({ refreshToken });

  if (!existingSession) {
    throw createHttpError(401, 'Session not found');
  }

  await Session.deleteOne({ _id: existingSession._id });

  const user = await User.findById(payload.userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const newAccessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' },
  );

  const newRefreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '30d' },
  );

  const now = new Date();

  await Session.create({
    userId: user._id,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(now.getTime() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token is missing');
  }

  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  await Session.deleteOne({ _id: session._id });
};
