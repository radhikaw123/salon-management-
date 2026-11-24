export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg: string) {
    return new AppError(msg, 400);
  }

  static unauthorized(msg = 'Authentication required') {
    return new AppError(msg, 401);
  }

  static forbidden(msg = 'Access denied: insufficient permissions') {
    return new AppError(msg, 403);
  }

  static notFound(msg = 'Resource not found') {
    return new AppError(msg, 404);
  }

  static conflict(msg = 'Resource state conflict') {
    return new AppError(msg, 409);
  }
}
