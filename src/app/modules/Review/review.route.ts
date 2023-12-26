import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import ReviewValidationSchema from './review.validation';
import ReviewControllers from './review.controller';
import auth from '../../middlewares/auth';

const route = express.Router();

route.post(
  '/',
  auth('user'),
  validateRequest(ReviewValidationSchema),
  ReviewControllers.createReview,
);

route.get('/:courseId', ReviewControllers.getReviews);

export const ReviewRoutes = route;
