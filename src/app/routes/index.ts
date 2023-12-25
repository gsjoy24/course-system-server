import { Router } from 'express';
import { CategoryRoutes } from '../modules/Category/category.route';
import { CoursesRoutes } from '../modules/Course/CourseRoutes/course.route';
import { CourseRoutesForPostAndBestCourse } from '../modules/Course/CourseRoutes/course.another.route';
import { ReviewRoutes } from '../modules/Review/review.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/course',
    route: CourseRoutesForPostAndBestCourse,
  },
  {
    path: '/courses',
    route: CoursesRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
