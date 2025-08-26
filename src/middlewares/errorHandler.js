import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      messages: err.status,
      data: err,
    });
    return;
  }
  res.status(400).json({
    status: 400,
    messages: 'Something went wrong!',
    data: err.message,
  });
};
