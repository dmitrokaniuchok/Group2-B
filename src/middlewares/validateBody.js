import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, {
            abortEarly: false
        });
        next();
    } catch (err) {
        const errors = err.details.map(d => d.message);
        next(createHttpError(400, "Validate failed", { errors }));
    }
};