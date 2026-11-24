import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/appError';

export interface UserContext {
  userId: string;
  salonId: string;
  role: 'OWNER' | 'RECEPTION' | 'STAFF';
}

declare global {
  namespace Express {
    interface Request {
      user?: UserContext;
    }
  }
}

export const authenticateJwt = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(AppError.unauthorized('No Bearer token provided'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as UserContext;
    req.user = {
      userId: decoded.userId,
      salonId: decoded.salonId,
      role: decoded.role,
    };
    next();
  } catch {
    next(AppError.unauthorized('Invalid or expired authentication token'));
  }
};
