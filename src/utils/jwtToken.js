import jwt from 'jsonwebtoken';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/index.js';

const SECRET_WORD = 'secret';

export function getAccessToken(props) {
  return jwt.sign({ expire: Date.now() + FIFTEEN_MINUTES, ...props }, SECRET_WORD);
}

export function getRefreshToken(props) {
  return jwt.sign({ expire: Date.now() + ONE_MONTH, ...props }, SECRET_WORD);
}

export function decodeToken(token)  {
    return jwt.verify(token, SECRET_WORD);
}