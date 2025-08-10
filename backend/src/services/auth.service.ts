import jwt from 'jsonwebtoken';
import VerificationCodeType from '../constants/verificationCodeTypes';
import SessionModel, { SessionDocument } from '../models/session.model';
import UserModel, { UserDocument } from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.model';
import {
  oneYearFromNow,
  ONE_DAY_MS,
  thirtyDaysFromNow,
  fiveMinutesAgo,
  oneHourFromNow,
} from '../utils/date';
import {
  APP_ORIGIN,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
  APPROVED_DOMAIN,
} from '../constants/env';
import appAssert from '../utils/appAssert';
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from '../constants/http';
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from '../utils/jwt';
import { sendMail } from '../utils/sendMail';
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from '../utils/emailTemplates';
import { hashValue } from '../utils/bcrypt';

export type CreateAccountParams = {
  name: string;
  email: string;
  password: string;
  userAgent?: string;
};
export const createAccount = async (data: CreateAccountParams) => {
  // verify email is from allowed domain
  const { email } = data;
  const emailDomain = email.split('@');
  appAssert(
    emailDomain[1] !== APPROVED_DOMAIN,
    UNAUTHORIZED,
    'Email address not allowed'
  );

  // verify existing user doesn't exist
  const existingUser = await UserModel.exists({
    email: data.email,
  });
  appAssert(!existingUser, CONFLICT, 'Email already in use');

  // create user
  const user = await UserModel.create({
    name: data.name,
    email: data.email,
    password: data.password,
  });
  const userId = user.id;

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const url = `${APP_ORIGIN}/verify-email/${verificationCode._id}`;
  // send verification email
  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });

  if (error) {
    console.error(error);
  }

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  // sign access token & refresh token
  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions
  );

  const accessToken = signToken({ userId, sessionId: session._id });

  // return user
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
