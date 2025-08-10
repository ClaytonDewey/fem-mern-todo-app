import { Router } from 'express';
import {
  registerHandler,
  loginHandler,
  verifyEmailHandler,
} from '../controllers/auth.controller';

const authRoutes = Router();

// prefix: /auth
authRoutes.post('/register', registerHandler);
authRoutes.post('/login', loginHandler);

authRoutes.get('/email/verify/:code', verifyEmailHandler);

export default authRoutes;
