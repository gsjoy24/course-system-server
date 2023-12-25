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

export const UserRoutes = router;
