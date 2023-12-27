import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import { Review } from '../Review/review.model';
import { excludeFields } from './course.constant';
import dateToWeeks from '../../utils/dateToWeeks';
import { JwtPayload } from 'jsonwebtoken';

const createCourseIntoDB = async (userData: JwtPayload, payload: TCourse) => {
  payload.createdBy = userData._id;
  const course = await Course.create(payload);
  return course;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const queryObject = { ...query };
  const searchTags = query?.tags
    ? {
        'tags.name': {
          $in: query.tags,
        },
      }
    : {};

  const minMaxPrice =
    query?.minPrice && query?.maxPrice
      ? {
          price: {
            $gte: query.minPrice,
            $lte: query.maxPrice,
          },
        }
      : {};

  const sortBy = query?.sortBy || 'title';
  const sortOrder = query?.sortOrder && query?.sortOrder === 'asc' ? 1 : -1;
  const sort: string | { [key: string]: 'asc' | 'desc' } = query.sortBy
    ? {
        [sortBy as string]: sortOrder === 1 ? 'asc' : 'desc',
      }
    : {};

  if (query?.startDate && query?.endDate) {
    queryObject.durationInWeeks = dateToWeeks(
      query.startDate as string,
      query.endDate as string,
    );
  }

  excludeFields.forEach((field) => delete queryObject[field]);

  if (query.level) {
    queryObject['details.level'] = query.level;
  }

  const courses = Course.find(queryObject).populate([
    {
      path: 'categoryId',
      select: '-__v',
    },
    {
      path: 'createdBy',
      select: '-createdAt -updatedAt -__v',
    },
  ]);
  const coursesWithTags = courses.find(searchTags);
  const coursesWithPrice = coursesWithTags.find(minMaxPrice);
  const total = await Course.countDocuments(coursesWithPrice);
  const allCourses = await coursesWithPrice.limit(limit).skip(skip).sort(sort);

  const meta = {
    page,
    limit,
    total,
  };

  return { allCourses, meta };
};

const getSingleCourseFromDB = async (id: string) => {
  const course = await Course.findById(id).populate([
    {
      path: 'categoryId',
      select: '-__v',
    },
    {
      path: 'createdBy',
      select: '-createdAt -updatedAt -__v',
    },
  ]);
  return course;
};

const updateCourseInDB = async (id: string, data: TCourse) => {
  const { details, tags, ...restData } = data;
  const modifiedData: Record<string, unknown> = { ...restData };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }

  if (tags && tags.length > 0) {
    //* deleting tags
    const deletedTags = tags
      .filter((tag) => tag.name && tag.isDeleted)
      .map((tag) => tag.name);

    const deleteTags = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          tags: {
            name: {
              $in: deletedTags,
            },
          },
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deleteTags) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update tags');
    }

    //* adding tags
    const addedTags = tags.filter((tag) => tag.name && !tag.isDeleted);

    const addTag = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          tags: {
            $each: addedTags,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!addTag) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }
  }

  if (data.startDate && data.endDate) {
    modifiedData.durationInWeeks = dateToWeeks(
      data.startDate as string,
      data.endDate as string,
    );
  }

  const course = await Course.findByIdAndUpdate(id, modifiedData, {
    new: true,
  }).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt -__v',
  });
  return course;
};

const deleteCourseFromDB = async (id: string) => {
  const course = await Course.findByIdAndDelete(id);
  return course;
};

const getTheBestCourseFromDB = async () => {
  const courses = await Course.find().populate([
    {
      path: 'categoryId',
      select: '-__v',
    },
    {
      path: 'createdBy',
      select: '-createdAt -updatedAt -__v',
    },
  ]);

  if (courses.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No courses found');
  }

  const reviews = await Review.find();
  let course: TCourse | null = null;
  let reviewCount: number = 0;
  let averageRating: number = -1;

  for (const singleCourse of courses) {
    const courseReviews = reviews.filter(
      (review) => String(review?.courseId) === String(singleCourse._id),
    );

    const totalReviews = courseReviews.length;
    const sumRatings = courseReviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    const highestRating = sumRatings / totalReviews;

    if (highestRating > averageRating) {
      averageRating = Number(highestRating.toFixed(1));
      course = singleCourse;
    }
  }

  if (course) {
    reviewCount = reviews.filter(
      (review) => String(review?.courseId) === String(course?._id),
    ).length;
  }

  return {
    course,
    averageRating,
    reviewCount,
  };
};

const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseInDB,
  deleteCourseFromDB,
  getTheBestCourseFromDB,
};

export default CourseServices;
