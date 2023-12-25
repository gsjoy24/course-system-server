import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import ReviewValidationSchema from './review.validation';
import ReviewControllers from './review.controller';

const route = express.Router();

route.post(
  '/',
  validateRequest(ReviewValidationSchema),
  ReviewControllers.createReview,
);

route.get('/:courseId', ReviewControllers.getReviews);

export const ReviewRoutes = route;
