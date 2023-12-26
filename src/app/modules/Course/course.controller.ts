import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CourseServices from './course.service';
import { Request, Response } from 'express';
import ReviewServices from '../Review/review.service';
import { JwtPayload } from 'jsonwebtoken';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const Course = await CourseServices.createCourseIntoDB(
    req.user as JwtPayload,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: Course,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const { allCourses: courses, meta } =
    await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieved successfully',
    meta,
    data: courses,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const course = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrieved successfully',
    data: course,
  });
});

const getSingleCourseWithReviews = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = await CourseServices.getSingleCourseFromDB(id);
    const reviews = await ReviewServices.getReviewsFromDB(id);

    if (!course) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Course not found',
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course and Reviews retrieved successfully',
      data: { course, reviews },
    });
  },
);

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const Course = await CourseServices.updateCourseInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: Course,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const course = await CourseServices.deleteCourseFromDB(id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const reviews = await ReviewServices.deleteReviewFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: null,
  });
});

const getTheBestCourse = catchAsync(async (req: Request, res: Response) => {
  const bestCourse = await CourseServices.getTheBestCourseFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Best Course retrieved successfully',
    data: bestCourse,
  });
});

const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  getSingleCourseWithReviews,
  updateCourse,
  deleteCourse,
  getTheBestCourse,
};

export default CourseControllers;
