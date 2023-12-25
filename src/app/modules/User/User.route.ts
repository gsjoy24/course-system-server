import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import UserValidations from './User.validation';
import { UserControllers } from './User.controller';
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

export const UserRoutes = router;
