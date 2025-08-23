import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9()+\-\s]+$/)
    .min(3)
    .max(20)
    .required(),
  email: Joi.string().email().min(3).max(50).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string()
    .pattern(/^[0-9()+\-\s]+$/)
    .min(3)
    .max(20),
  email: Joi.string().email().min(3).max(50),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal'),
}).min(1);
