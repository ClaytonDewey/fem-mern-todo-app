import { z } from 'zod';
import catchErrors from '../utils/catchErrors';
import { createAccount } from '../services/auth.service';
import { CREATED, OK, UNAUTHORIZED } from '../constants/http';
import {
  setAuthCookies,
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from '../utils/cookies';
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from './auth.schema';
import { verifyToken } from '../utils/jwt';
import SessionModel from '../models/session.model';
import appAssert from '../utils/appAssert';

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  });

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});
