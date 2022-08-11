import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AutchErr from '../errors/autchErr';

interface SessionRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AutchErr('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new AutchErr('Необходима авторизация');
  }
  req.user = payload;
  next();
  // return null;
};
