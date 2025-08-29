import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.status(err.status).json({
            status: err.status,
            messages: err.message,
            errors: err.errors || []
        });
        return;
    }
    res.status(400).json({
        status: 400,
        messages: 'Something went wrong!',
        errors: [err.message]
    });
};