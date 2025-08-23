import express from 'express';
import { login, logout, refresh, register } from '../controllers/auth.js';
import { sendResetEmail } from '../controllers/sendResetEmail.js';
import { resetPassword } from '../controllers/resetPassword.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema, registerSchema } from '../validation/auth.js';
import { resetPasswordSchema } from '../validation/resetPasswordSchema.js';
import { sendResetEmailSchema } from '../validation/sendResetEmailSchema.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), ctrlWrapper(register));

router.post('/login', validateBody(loginSchema), ctrlWrapper(login));

router.post('/refresh', ctrlWrapper(refresh));

router.post('/logout', ctrlWrapper(logout));

router.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmail),
);
router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPassword),
);

export default router;
