export class BaseError extends Error {
  constructor(log, message, methodName, httpCode, isOperational) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.log = log;
    if (methodName) this.methodName = methodName;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
