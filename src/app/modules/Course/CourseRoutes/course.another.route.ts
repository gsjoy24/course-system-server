import express from 'express';
import CourseControllers from '../course.controller';
import validateRequest from '../../../middlewares/validateRequest';
import CourseValidators from '../course.validation';

const route = express.Router();

// course routes
route.post(
  '/',
  validateRequest(CourseValidators.CreateCourseValidationSchema),
  CourseControllers.createCourse,
);
route.get('/best', CourseControllers.getTheBestCourse);

export const CourseRoutesForPostAndBestCourse = route;
