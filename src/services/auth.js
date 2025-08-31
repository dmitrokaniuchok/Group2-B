import createHttpError from 'http-errors';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../models/Session.js';
import { ONE_DAY, ONE_MONTH } from '../constants/index.js';
import {
  decodeToken,
  getAccessToken,
  getRefreshToken,
} from '../utils/jwtToken.js';


export const registerUser = async (payload) => {
  const user = await User.findOne({
    email: payload.email,
  });
  if (user) {
    throw createHttpError(409, { errors: ['Email already exists'] });
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await User.create({
    ...payload,
    password: encryptedPassword,
  });
  const newSession = createSession({ user: newUser });

  await SessionCollection.create({
    userId: newUser._id,
    ...newSession,
  });
  return {
    ...newUser._doc,
    accessToken: newSession.accessToken,
    refreshToken: newSession.refreshToken,
  };
};

export const loginUser = async (payload) => {
  const user = await User.findOne({
    email: payload.email,
  });
  if (!user) {
    throw createHttpError(401, 'User not found!', {
      errors: ['User with this email not found!'],
    });
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized', {
      errors: ['Invalid password'],
    });
  }

  const newSession = createSession({ user });

  return await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });
};

const createSession = ({ user }) => {
  const accessToken = getAccessToken({ email: user.email });
  const refreshToken = getRefreshToken({ email: user.email });
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ONE_DAY),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  };
};

export const refreshUser = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'session not found!');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const decoded = decodeToken(refreshToken);
  
  const newSession = createSession({user:{email:decoded.email}});
  await SessionCollection.deleteOne({
    userId: session.userId,
    refreshToken,
  });
  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  return await SessionCollection.deleteOne({ _id: sessionId });
};
