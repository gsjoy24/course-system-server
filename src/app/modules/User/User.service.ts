import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './User.interface';
import { User } from './User.model';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

const loginUser = async (payload: TLoginUser) => {
  // check if the user exists
  const isUserExits = await User.isUserExists(payload.username);
  if (!isUserExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const user = await User.findOne({ username: payload.username }).select(
    '-updatedAt -createdAt -__v ',
  );

  // check for password match
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    isUserExits.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid credentials! Try again!',
    );
  }
  const jwtPayload = {
    _id: isUserExits._id,
    role: isUserExits.role,
    email: isUserExits.email,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expiration,
  });

  return { user, token };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
