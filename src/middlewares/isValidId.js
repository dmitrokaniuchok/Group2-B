import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return res.status(400).json({ message: `${contactId} is not a valid id` });
  }

  next();
};
