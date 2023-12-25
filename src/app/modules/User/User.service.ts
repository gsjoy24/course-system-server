import { TUser } from './User.interface';
import { User } from './User.model';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

export const UserServices = {
  createUserIntoDB,
};
