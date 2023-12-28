import express from 'express';
import CourseControllers from '../course.controller';
const route = express.Router();

// course route
route.get('/best', CourseControllers.getTheBestCourse);
export const CourseRoutesForPostAndBestCourse = route;
