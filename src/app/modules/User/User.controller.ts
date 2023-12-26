import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './User.service';

const createUser = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const user = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: result,
  });
});
export const UserControllers = {
  createUser,
  loginUser,
};
