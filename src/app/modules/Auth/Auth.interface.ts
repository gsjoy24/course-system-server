/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TPreviousPassword = {
  password: string;
  createdAt: Date;
};
export type TUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  previousPasswords?: [TPreviousPassword];
  role: 'user' | 'admin';
};

export type TUserRole = 'user' | 'admin';

export type TLoginUser = {
  username: string;
  password: string;
};

export type TPasswordChange = {
  currentPassword: string;
  newPassword: string;
};

export interface UserModel extends Model<TUser> {
  isUserExists(username: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
