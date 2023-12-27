/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { TLoginUser, TPasswordChange, TUser } from './Auth.interface';
import { User } from './Auth.model';
import config from '../../config';
import convertDate from '../../utils/dateConverter';

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

const changePassword = async (
  userData: JwtPayload,
  payload: TPasswordChange,
) => {
  // check if the user exists
  const user = await User.findById(userData._id).select(
    '+password +previousPasswords',
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the old password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload.currentPassword,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Password change failed. Ensure the new password is unique and not among the last 2 used (last used on 2023-01-01 at 12:00 PM).',
    );
  }

  // check if the new password is unique from the last two passwords
  if (user.previousPasswords) {
    let date;
    const isPasswordUnique = user.previousPasswords.every((prevPassword) => {
      const isMatched = bcrypt.compareSync(
        payload.newPassword,
        prevPassword.password,
      );
      date = isMatched && convertDate(prevPassword.createdAt);
      return !isMatched;
    });
    if (!isPasswordUnique) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Password change failed. Ensure the new password is unique and not among the last 2 used ${
          date && `(last used on ${date}).`
        }`,
      );
    }
  }

  //  check if the new password is unique from last two passwords
  // const newPassword = await bcrypt.hash(
  //   payload.newPassword,
  //   Number(config.bcrypt_salt_round),
  // );

  // const updatedNewPassword = await User.findByIdAndUpdate(
  //   user._id,
  //   { password: newPassword },
  //   { new: true },
  // );

  // if (!updatedNewPassword) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  // }

  // const updatePreviousPasswords = await User.findByIdAndUpdate(
  //   user._id,
  //   {
  //     $push: {
  //       previousPasswords: {
  //         $each: [
  //           {
  //             password: user.password,
  //             createdAt: new Date(),
  //           },
  //         ],
  //         $slice: -2, // Keep only the last two elements in the array
  //       },
  //     },
  //   },
  //   { new: true }, // To get the updated user object
  // );

  return 'updatedNewPassword';
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  changePassword,
};
