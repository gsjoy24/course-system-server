import express from 'express';
import CourseControllers from '../course.controller';
import validateRequest from '../../../middlewares/validateRequest';
import CourseValidators from '../course.validation';
import auth from '../../../middlewares/auth';

const route = express.Router();

// courses routes
route.get('/', CourseControllers.getAllCourses);
route.get('/:id', CourseControllers.getSingleCourse);
route.get('/:id/reviews', CourseControllers.getSingleCourseWithReviews);
route.put(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidators.UpdateCourseValidationSchema),
  CourseControllers.updateCourse,
);
route.delete('/:id', auth('admin'), CourseControllers.deleteCourse);

export const CoursesRoutes = route;
