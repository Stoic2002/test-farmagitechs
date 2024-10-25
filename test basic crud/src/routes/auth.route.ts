import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateLogin } from '../middleware/validators/auth.validator';

const router = Router();
const controller = new AuthController();

router.post('/login', validateLogin, controller.login);

export default router;