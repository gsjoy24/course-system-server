import { JwtPayload } from 'jsonwebtoken';
import TReview from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (userData: JwtPayload, payload: TReview) => {
  payload.createdBy = userData._id;
  const review = (await Review.create(payload)).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt -__v',
  });
  return review;
};

const getReviewsFromDB = async (courseId: string) => {
  const reviews = await Review.find({ courseId }).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt -__v',
  });
  return reviews;
};

// it will delete all the reviews of a course when the course is deleted
const deleteReviewFromDB = async (courseId: string) => {
  const review = await Review.deleteMany({ courseId });
  return review;
};

const getAllReviewsFromDB = async () => {
  const reviews = await Review.find().populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt -__v',
  });
  return reviews;
};

const ReviewServices = {
  createReviewIntoDB,
  getReviewsFromDB,
  deleteReviewFromDB,
  getAllReviewsFromDB,
};

export default ReviewServices;
