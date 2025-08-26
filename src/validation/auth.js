import Joi from "joi";

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': `Username should be a string`,
        'string.min': `Username should have at least {#limit} characters`,
        'string.max': `Username should have at most {#limit} characters`,
        'any.required': `Username is required`
    }),
    email: Joi.string().email().min(5).max(30).required().messages({
        'string.base': `email must be a valid email. Example:"example@gmail.com"`,
        'string.min': `email should have at least {#limit} characters`,
        'string.max': `email should have at most {#limit} characters`,
        'any.required': `email is required`
    }),
    password: Joi.string().min(5).required().messages({
        'string.min': `password should be at least {#limit} characters`,
        'any.required': `password is required`
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Confirm password is required',
    })
});
export const loginUserSchema = Joi.object({
    email: Joi.string().required().email().messages({
        'string.base': 'email must be a valid email. Example:"example@gmail.com"',
        'any.required': `email is required`
    }),
    password: Joi.string().required().messages({
    'any.required': `password is required`
    })
});