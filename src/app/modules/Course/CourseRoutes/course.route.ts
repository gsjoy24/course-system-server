import express from 'express';
import CourseControllers from '../course.controller';
import validateRequest from '../../../middlewares/validateRequest';
import CourseValidators from '../course.validation';

const route = express.Router();

// courses routes

route.get('/', CourseControllers.getAllCourses);
route.get('/:id', CourseControllers.getSingleCourse);
route.get('/:id/reviews', CourseControllers.getSingleCourseWithReviews);
route.put(
  '/:id',
  validateRequest(CourseValidators.UpdateCourseValidationSchema),
  CourseControllers.updateCourse,
);
route.delete('/:id', CourseControllers.deleteCourse);

export const CoursesRoutes = route;
