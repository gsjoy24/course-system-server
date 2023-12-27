import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import UserValidations from './Auth.validation';
import { UserControllers } from './Auth.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.UserValidationSchema),
  UserControllers.createUser,
);
router.post(
  '/login',
  validateRequest(UserValidations.LoginUserValidationSchema),
  UserControllers.loginUser,
);

router.post(
  '/change-password',
  auth('user', 'admin'),
  validateRequest(UserValidations.PasswordChangeValidationSchema),
  UserControllers.changePassword,
);

export const UserRoutes = router;
