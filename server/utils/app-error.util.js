import { BaseError } from './base-error.util.js';

const appErrorHandler = (err, req, res, next) => {
  // In prod, don't use console.log or console.err because it's not async.
  if (err instanceof BaseError) {
    res.status(err.httpCode).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Something went wrong',
  });
};

export default appErrorHandler;
