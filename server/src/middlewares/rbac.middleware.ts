import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const authorizeRoles = (...allowedRoles: Array<'OWNER' | 'RECEPTION' | 'STAFF'>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(AppError.unauthorized());
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        AppError.forbidden(`Role '${req.user.role}' is not authorized to access this resource`)
      );
    }

    next();
  };
};
