import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authentication } from '../middlewares/Authentication.js';
import { getCurrentUserController } from '../controllers/userControllers.js';

const router = Router();

router.get('/current', authentication, ctrlWrapper(getCurrentUserController));

export default router;
